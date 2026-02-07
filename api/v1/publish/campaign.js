import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import Queue from 'bull';
import axios from 'axios';

const router = express.Router();

// Redis Queue for publishing
const publishQueue = new Queue('publish-campaign', {
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379
  }
});

// Store for job tracking
const jobStore = new Map();

/**
 * Publish to Instagram via Meta Business API
 */
async function publishToInstagram(asset, metadata) {
  try {
    const accessToken = process.env.META_ACCESS_TOKEN;
    const igBusinessAccountId = process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID;

    if (!accessToken || !igBusinessAccountId) {
      throw new Error('Instagram credentials not configured');
    }

    const postData = {
      image_url: asset.image_url,
      caption: asset.caption,
      user_tags: asset.tags || [],
      media_type: 'IMAGE'
    };

    const response = await axios.post(
      `https://graph.instagram.com/${igBusinessAccountId}/media`,
      postData,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
        params: { access_token: accessToken }
      }
    );

    // Publish the media
    await axios.post(
      `https://graph.instagram.com/${response.data.id}/publish`,
      {},
      {
        headers: { Authorization: `Bearer ${accessToken}` },
        params: { access_token: accessToken }
      }
    );

    return {
      platform: 'instagram',
      media_id: response.data.id,
      url: `https://instagram.com/p/${response.data.id}`,
      status: 'published',
      timestamp: new Date().toISOString()
    };

  } catch (error) {
    console.error('Instagram publishing error:', error);
    throw new Error(`Failed to publish to Instagram: ${error.message}`);
  }
}

/**
 * Publish to Email via Brevo
 */
async function publishToEmail(asset, metadata) {
  try {
    const apiKey = process.env.BREVO_API_KEY;
    const senderEmail = process.env.BREVO_SENDER_EMAIL || 'noreply@resetprimal.com';

    if (!apiKey) {
      throw new Error('Brevo API key not configured');
    }

    const emailData = {
      to: metadata.recipients || [{ email: metadata.recipient_email }],
      templateId: metadata.template_id || 1,
      params: {
        campaign_name: metadata.campaign_id,
        image_url: asset.image_url,
        cta_text: asset.cta || 'Learn More',
        cta_url: asset.cta_url,
        copy: asset.caption
      },
      tags: [metadata.campaign_id, metadata.series || 'default']
    };

    const response = await axios.post(
      'https://api.brevo.com/v3/smtp/email',
      emailData,
      {
        headers: {
          'api-key': apiKey,
          'Content-Type': 'application/json'
        }
      }
    );

    return {
      platform: 'email',
      message_id: response.data.messageId,
      status: 'sent',
      timestamp: new Date().toISOString()
    };

  } catch (error) {
    console.error('Email publishing error:', error);
    throw new Error(`Failed to publish to Email: ${error.message}`);
  }
}

/**
 * Publish to Meta Ads Manager
 */
async function publishToMetaAds(asset, metadata) {
  try {
    const accessToken = process.env.META_ACCESS_TOKEN;
    const adAccountId = process.env.META_AD_ACCOUNT_ID;

    if (!accessToken || !adAccountId) {
      throw new Error('Meta Ads credentials not configured');
    }

    // Create ad creative
    const creativeData = {
      name: `${metadata.campaign_id}_${uuidv4()}`,
      object_story_spec: {
        page_id: metadata.page_id,
        link_data: {
          message: asset.caption,
          link: asset.cta_url,
          image_hash: await uploadAdImage(asset.image_url, accessToken),
          caption: asset.cta || 'Learn More'
        }
      }
    };

    const creativeResponse = await axios.post(
      `https://graph.facebook.com/v18.0/${adAccountId}/adcreatives`,
      creativeData,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
        params: { access_token: accessToken }
      }
    );

    // Create ad campaign
    const campaignData = {
      name: `${metadata.campaign_id}_campaign`,
      objective: metadata.objective || 'LINK_CLICKS',
      status: 'PAUSED'
    };

    const campaignResponse = await axios.post(
      `https://graph.facebook.com/v18.0/${adAccountId}/campaigns`,
      campaignData,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
        params: { access_token: accessToken }
      }
    );

    return {
      platform: 'meta_ads',
      creative_id: creativeResponse.data.id,
      campaign_id: campaignResponse.data.id,
      status: 'created',
      timestamp: new Date().toISOString()
    };

  } catch (error) {
    console.error('Meta Ads publishing error:', error);
    throw new Error(`Failed to publish to Meta Ads: ${error.message}`);
  }
}

/**
 * Upload image for Meta Ads
 */
async function uploadAdImage(imageUrl, accessToken) {
  try {
    const response = await axios.post(
      'https://graph.instagram.com/me/media',
      { image_url: imageUrl },
      {
        headers: { Authorization: `Bearer ${accessToken}` },
        params: { access_token: accessToken }
      }
    );
    return response.data.image_hash;
  } catch (error) {
    console.error('Image upload to Meta error:', error);
    throw error;
  }
}

/**
 * Publish to YouTube via YouTube Data API
 */
async function publishToYouTube(asset, metadata) {
  try {
    const accessToken = process.env.YOUTUBE_ACCESS_TOKEN;

    if (!accessToken) {
      throw new Error('YouTube credentials not configured');
    }

    const videoData = {
      snippet: {
        title: asset.title || metadata.campaign_id,
        description: asset.caption,
        tags: metadata.tags || [metadata.campaign_id],
        categoryId: metadata.category_id || '27'
      },
      status: {
        privacyStatus: 'public',
        publishAt: metadata.publish_at || new Date().toISOString()
      }
    };

    const response = await axios.post(
      'https://www.googleapis.com/youtube/v3/videos?part=snippet,status',
      videoData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return {
      platform: 'youtube',
      video_id: response.data.id,
      url: `https://youtube.com/watch?v=${response.data.id}`,
      status: 'published',
      timestamp: new Date().toISOString()
    };

  } catch (error) {
    console.error('YouTube publishing error:', error);
    throw new Error(`Failed to publish to YouTube: ${error.message}`);
  }
}

/**
 * Process publish jobs
 */
publishQueue.process(async (job) => {
  const { campaign_id, assets, channels, simultaneous, tracking, job_id } = job.data;

  try {
    const results = {
      campaign_id,
      job_id,
      published_count: 0,
      failed_count: 0,
      channels_results: [],
      tracking_info: {}
    };

    // Publish to each channel
    for (const asset of assets) {
      const channelResults = [];

      for (const channel of channels) {
        try {
          let result;

          switch (channel) {
            case 'instagram':
              result = await publishToInstagram(asset, job.data);
              break;
            case 'email':
              result = await publishToEmail(asset, job.data);
              break;
            case 'meta_ads':
              result = await publishToMetaAds(asset, job.data);
              break;
            case 'youtube':
              result = await publishToYouTube(asset, job.data);
              break;
            default:
              result = { platform: channel, status: 'skipped', reason: 'Unknown channel' };
          }

          channelResults.push(result);
          results.published_count++;

        } catch (error) {
          channelResults.push({
            platform: channel,
            status: 'failed',
            error: error.message
          });
          results.failed_count++;
        }
      }

      results.channels_results.push({
        asset_id: asset.id,
        channels: channelResults
      });

      job.progress((results.published_count / (assets.length * channels.length)) * 100);
    }

    // Setup tracking if enabled
    if (tracking && tracking.ga4) {
      results.tracking_info.ga4 = {
        measurement_id: process.env.GA4_MEASUREMENT_ID,
        events_sent: results.published_count,
        timestamp: new Date().toISOString()
      };
    }

    return results;

  } catch (error) {
    console.error(`Publishing failed for job ${job_id}:`, error);
    throw new Error(`Publishing failed: ${error.message}`);
  }
});

/**
 * POST /api/v1/publish/campaign
 */
router.post('/campaign', async (req, res) => {
  try {
    const { campaign_id, assets, simultaneous, tracking } = req.body;

    // Validation
    if (!campaign_id || !assets || assets.length === 0) {
      return res.status(400).json({
        error: true,
        message: 'Missing required fields: campaign_id, assets (array)'
      });
    }

    const job_id = uuidv4();
    const channels = req.body.channels || ['instagram', 'email', 'meta_ads'];

    const job_data = {
      campaign_id,
      assets,
      channels,
      simultaneous: simultaneous !== false,
      tracking: tracking || { ga4: true, meta_pixel: true },
      job_id,
      started_at: Date.now()
    };

    // Add job to queue
    const job = await publishQueue.add(job_data, {
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
      status: 'publishing',
      assets_count: assets.length,
      channels,
      created_at: new Date().toISOString(),
      bull_job_id: job.id
    });

    res.status(202).json({
      status: 'publishing',
      job_id,
      campaign_id,
      assets_count: assets.length,
      channels,
      estimated_time: '60s',
      polling_url: `/api/v1/jobs/${job_id}`,
      webhook_support: true
    });

  } catch (error) {
    console.error('Publish campaign request error:', error);
    res.status(500).json({
      error: true,
      message: error.message
    });
  }
});

// Job completion handlers
publishQueue.on('completed', (job) => {
  const job_id = job.data.job_id;
  if (jobStore.has(job_id)) {
    const jobInfo = jobStore.get(job_id);
    jobInfo.status = 'completed';
    jobInfo.result = job.returnvalue;
    jobInfo.completed_at = new Date().toISOString();
  }
});

publishQueue.on('failed', (job, err) => {
  const job_id = job.data.job_id;
  if (jobStore.has(job_id)) {
    const jobInfo = jobStore.get(job_id);
    jobInfo.status = 'failed';
    jobInfo.error = err.message;
    jobInfo.failed_at = new Date().toISOString();
  }
});

export default router;
