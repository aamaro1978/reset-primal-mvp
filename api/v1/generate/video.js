import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import Queue from 'bull';
import ffmpeg from 'fluent-ffmpeg';
import ffmpegStatic from 'ffmpeg-static';
import { downloadImage } from '../utils/s3-uploader.js';
import { uploadToS3 } from '../utils/s3-uploader.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const router = express.Router();

// Set ffmpeg path
ffmpeg.setFfmpegPath(ffmpegStatic);

// Redis Queue for video generation
const videoQueue = new Queue('video-generation', {
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379
  }
});

// Store for job tracking
const jobStore = new Map();

/**
 * Generate video from images using FFmpeg
 */
async function generateVideoFromImages(imageUrls, options = {}) {
  const {
    duration = 30,
    music = 'upbeat',
    captions = true,
    transitionDuration = 0.5
  } = options;

  const tmpDir = path.join(__dirname, '../../tmp');
  if (!fs.existsSync(tmpDir)) {
    fs.mkdirSync(tmpDir, { recursive: true });
  }

  const outputPath = path.join(tmpDir, `video_${uuidv4()}.mp4`);
  const imageDuration = duration / imageUrls.length;

  return new Promise(async (resolve, reject) => {
    try {
      // Download images
      const imageBuffers = [];
      for (const url of imageUrls) {
        const buffer = await downloadImage(url);
        imageBuffers.push(buffer);
      }

      // Create image files
      const imagePaths = [];
      for (let i = 0; i < imageBuffers.length; i++) {
        const imagePath = path.join(tmpDir, `img_${i}.jpg`);
        fs.writeFileSync(imagePath, imageBuffers[i]);
        imagePaths.push(imagePath);
      }

      // Build FFmpeg concat filter
      let filterComplex = '';
      let inputStr = '';
      
      // Add images as inputs
      imagePaths.forEach((imgPath, idx) => {
        inputStr += ` -loop 1 -t ${imageDuration} -i "${imgPath}"`;
      });

      // Create concat filter
      filterComplex = imagePaths.map((_, idx) => `[${idx}:v]scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2[v${idx}]`).join(';');
      filterComplex += ';' + imagePaths.map((_, idx) => `[v${idx}]fade=t=in:st=0:d=${transitionDuration},fade=t=out:st=${imageDuration - transitionDuration}:d=${transitionDuration}`).map((_, idx) => `[fv${idx}]`).join('');

      // Execute ffmpeg
      let command = ffmpeg()
        .on('error', (err) => {
          // Cleanup
          [outputPath, ...imagePaths].forEach(f => {
            try { fs.unlinkSync(f); } catch (e) {}
          });
          reject(err);
        })
        .on('end', () => {
          // Cleanup temp images
          imagePaths.forEach(f => {
            try { fs.unlinkSync(f); } catch (e) {}
          });
          resolve(outputPath);
        });

      // Add inputs
      imagePaths.forEach(imgPath => {
        command = command.input(imgPath)
          .inputOptions(['-loop 1', `-t ${imageDuration}`]);
      });

      // Set filter and output
      command
        .outputOptions([
          '-c:v libx264',
          '-pix_fmt yuv420p',
          '-crf 23',
          '-r 30'
        ])
        .output(outputPath)
        .run();

    } catch (error) {
      reject(error);
    }
  });
}

// Process video generation jobs
videoQueue.process(async (job) => {
  const { campaign_id, images, copy, duration, music, captions, job_id } = job.data;

  try {
    job.progress(25);

    // Generate video
    const videoPath = await generateVideoFromImages(images, {
      duration: duration || 30,
      music: music || 'upbeat',
      captions: captions !== false
    });

    job.progress(75);

    // Read video file
    const videoBuffer = fs.readFileSync(videoPath);

    // Upload to S3
    const timestamp = new Date().toISOString().slice(0, 10);
    const fileId = uuidv4();
    const key = `${timestamp}/${campaign_id}/videos/${fileId}.mp4`;

    const s3 = new (await import('aws-sdk')).S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION || 'us-east-1'
    });

    const uploadParams = {
      Bucket: process.env.S3_BUCKET || 'reset-primal-assets',
      Key: key,
      Body: videoBuffer,
      ContentType: 'video/mp4',
      Metadata: {
        campaign: campaign_id,
        timestamp: new Date().toISOString()
      }
    };

    const result = await s3.upload(uploadParams).promise();

    job.progress(100);

    // Cleanup
    fs.unlinkSync(videoPath);

    return {
      success: true,
      job_id,
      campaign_id,
      video: {
        duration: duration || 30,
        format: 'mp4',
        s3_url: result.Location,
        cdn_url: `${process.env.CDN_BASE_URL}/${result.Key}`,
        file_size: videoBuffer.length,
        images_count: images.length,
        timestamp: new Date().toISOString()
      }
    };

  } catch (error) {
    console.error(`Video generation failed for job ${job_id}:`, error);
    throw new Error(`Video generation failed: ${error.message}`);
  }
});

// POST /api/v1/generate/video
router.post('/video', async (req, res) => {
  try {
    const { campaign_id, images, copy, duration, music, captions } = req.body;

    // Validation
    if (!campaign_id || !images || images.length === 0) {
      return res.status(400).json({
        error: true,
        message: 'Missing required fields: campaign_id, images (array)'
      });
    }

    const job_id = uuidv4();
    const job_data = {
      campaign_id,
      images,
      copy: copy || '',
      duration: duration || 30,
      music: music || 'upbeat',
      captions: captions !== false,
      job_id,
      started_at: Date.now()
    };

    // Add job to queue
    const job = await videoQueue.add(job_data, {
      attempts: 2,
      backoff: {
        type: 'exponential',
        delay: 3000
      },
      removeOnComplete: false
    });

    // Store job info
    jobStore.set(job_id, {
      job_id,
      campaign_id,
      status: 'generating',
      images_count: images.length,
      duration: duration || 30,
      created_at: new Date().toISOString(),
      bull_job_id: job.id
    });

    res.status(202).json({
      status: 'generating',
      job_id,
      campaign_id,
      estimated_time: `${(images.length * 15) + 60}s`,
      polling_url: `/api/v1/jobs/${job_id}`,
      webhook_support: true
    });

  } catch (error) {
    console.error('Video generation request error:', error);
    res.status(500).json({
      error: true,
      message: error.message
    });
  }
});

// Job completion handlers
videoQueue.on('completed', (job) => {
  const job_id = job.data.job_id;
  if (jobStore.has(job_id)) {
    const jobInfo = jobStore.get(job_id);
    jobInfo.status = 'completed';
    jobInfo.result = job.returnvalue;
    jobInfo.completed_at = new Date().toISOString();
  }
});

videoQueue.on('failed', (job, err) => {
  const job_id = job.data.job_id;
  if (jobStore.has(job_id)) {
    const jobInfo = jobStore.get(job_id);
    jobInfo.status = 'failed';
    jobInfo.error = err.message;
    jobInfo.failed_at = new Date().toISOString();
  }
});

export default router;
