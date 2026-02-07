import express from 'express';
import { OpenAI } from 'openai';
import { v4 as uuidv4 } from 'uuid';
import Queue from 'bull';
import { uploadToS3 } from '../utils/s3-uploader.js';
import { generateVisualBrief } from './prompt-builder.js';
import { processImage } from '../utils/image-processor.js';

const router = express.Router();
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Redis Queue for image generation
const imageQueue = new Queue('image-generation', {
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379
  }
});

// Store for job tracking
const jobStore = new Map();

// Process image generation jobs
imageQueue.process(async (job) => {
  const { campaign_id, copy, series, platform, style, generate_variations, job_id } = job.data;

  try {
    // Step 1: Generate visual brief from copy
    const visualBrief = await generateVisualBrief(copy, style);
    
    job.progress(25);

    // Step 2: Generate images with DALL-E 3
    const images = [];
    const variations = generate_variations || 3;

    for (let i = 0; i < variations; i++) {
      const response = await client.images.generate({
        model: 'dall-e-3',
        prompt: visualBrief,
        n: 1,
        size: '1024x1024',
        quality: 'hd'
      });

      images.push({
        url: response.data[0].url,
        revised_prompt: response.data[0].revised_prompt,
        index: i + 1
      });

      job.progress(25 + (i / variations) * 50);
    }

    // Step 3: Process images for each platform
    const processedImages = {};
    const platformSizes = {
      'instagram': { width: 1080, height: 1080 },
      'email': { width: 600, height: 600 },
      'landing': { width: 1920, height: 1080 },
      'paid': { width: 1200, height: 628 },
      'youtube': { width: 1280, height: 720 }
    };

    const size = platformSizes[platform] || platformSizes['instagram'];
    
    const selectedImage = images[0];
    const processedImageData = await processImage(
      selectedImage.url,
      size.width,
      size.height,
      campaign_id,
      copy
    );

    job.progress(85);

    // Step 4: Upload to S3
    const s3Urls = await uploadToS3(
      processedImageData,
      campaign_id,
      platform,
      series
    );

    job.progress(100);

    return {
      success: true,
      job_id,
      campaign_id,
      images: images.map((img, idx) => ({
        variation: idx + 1,
        generated_prompt: img.revised_prompt,
        original_url: img.url,
        processed_urls: s3Urls,
        platform: platform,
        timestamp: new Date().toISOString()
      })),
      processing_time_ms: Date.now() - job.data.started_at
    };

  } catch (error) {
    console.error(`Image generation failed for job ${job_id}:`, error);
    throw new Error(`Image generation failed: ${error.message}`);
  }
});

// POST /api/v1/generate/image
router.post('/image', async (req, res) => {
  try {
    const { campaign_id, copy, series, platform, style, generate_variations } = req.body;

    // Validation
    if (!campaign_id || !copy || !platform) {
      return res.status(400).json({
        error: true,
        message: 'Missing required fields: campaign_id, copy, platform'
      });
    }

    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({
        error: true,
        message: 'OpenAI API key not configured'
      });
    }

    const job_id = uuidv4();
    const job_data = {
      campaign_id,
      copy,
      series: series || 'default',
      platform: platform || 'instagram',
      style: style || 'minimalist',
      generate_variations: generate_variations || 3,
      job_id,
      started_at: Date.now()
    };

    // Add job to queue
    const job = await imageQueue.add(job_data, {
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 2000
      },
      removeOnComplete: false
    });

    // Store job info
    jobStore.set(job_id, {
      job_id,
      campaign_id,
      platform,
      status: 'generating',
      created_at: new Date().toISOString(),
      bull_job_id: job.id
    });

    res.status(202).json({
      status: 'generating',
      job_id,
      campaign_id,
      platform,
      estimated_time: '120s',
      polling_url: `/api/v1/jobs/${job_id}`,
      webhook_support: true
    });

  } catch (error) {
    console.error('Image generation request error:', error);
    res.status(500).json({
      error: true,
      message: error.message
    });
  }
});

// Job completion handler
imageQueue.on('completed', (job) => {
  const job_id = job.data.job_id;
  if (jobStore.has(job_id)) {
    const jobInfo = jobStore.get(job_id);
    jobInfo.status = 'completed';
    jobInfo.result = job.returnvalue;
    jobInfo.completed_at = new Date().toISOString();
  }
});

imageQueue.on('failed', (job, err) => {
  const job_id = job.data.job_id;
  if (jobStore.has(job_id)) {
    const jobInfo = jobStore.get(job_id);
    jobInfo.status = 'failed';
    jobInfo.error = err.message;
    jobInfo.failed_at = new Date().toISOString();
  }
});

export default router;
