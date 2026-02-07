import express from 'express';
import Queue from 'bull';

const router = express.Router();

// Reference to job stores (will be populated by other modules)
const jobStores = {
  'image-generation': new Map(),
  'video-generation': new Map(),
  'publish-campaign': new Map()
};

// Create queues
const queues = {
  'image-generation': new Queue('image-generation', {
    redis: {
      host: process.env.REDIS_HOST || 'localhost',
      port: process.env.REDIS_PORT || 6379
    }
  }),
  'video-generation': new Queue('video-generation', {
    redis: {
      host: process.env.REDIS_HOST || 'localhost',
      port: process.env.REDIS_PORT || 6379
    }
  }),
  'publish-campaign': new Queue('publish-campaign', {
    redis: {
      host: process.env.REDIS_HOST || 'localhost',
      port: process.env.REDIS_PORT || 6379
    }
  })
};

/**
 * Get job status
 * GET /api/v1/jobs/:job_id
 */
router.get('/:job_id', async (req, res) => {
  try {
    const { job_id } = req.params;

    // Search across all job stores
    let jobInfo = null;
    let foundIn = null;

    for (const [queueName, store] of Object.entries(jobStores)) {
      if (store.has(job_id)) {
        jobInfo = store.get(job_id);
        foundIn = queueName;
        break;
      }
    }

    if (!jobInfo) {
      return res.status(404).json({
        error: true,
        message: `Job ${job_id} not found`
      });
    }

    // Get progress from Bull queue if job is still processing
    if (jobInfo.bull_job_id && foundIn) {
      try {
        const queue = queues[foundIn];
        const bullJob = await queue.getJob(jobInfo.bull_job_id);

        if (bullJob) {
          const progress = bullJob.progress();
          jobInfo.progress = progress;
          jobInfo.state = await bullJob.getState();
          jobInfo.attempts = bullJob.attemptsMade;
          jobInfo.max_attempts = bullJob.opts.attempts;
        }
      } catch (error) {
        console.error('Error getting Bull job:', error);
      }
    }

    res.json({
      job_id,
      ...jobInfo,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Job status retrieval error:', error);
    res.status(500).json({
      error: true,
      message: error.message
    });
  }
});

/**
 * Get all jobs
 * GET /api/v1/jobs
 */
router.get('/', async (req, res) => {
  try {
    const allJobs = [];

    for (const [queueName, store] of Object.entries(jobStores)) {
      for (const [jobId, jobInfo] of store.entries()) {
        allJobs.push({
          job_id: jobId,
          queue: queueName,
          ...jobInfo
        });
      }
    }

    // Filter by status if provided
    const { status } = req.query;
    const filtered = status
      ? allJobs.filter(job => job.status === status)
      : allJobs;

    res.json({
      total: filtered.length,
      jobs: filtered.sort((a, b) => 
        new Date(b.created_at) - new Date(a.created_at)
      ),
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Jobs list error:', error);
    res.status(500).json({
      error: true,
      message: error.message
    });
  }
});

/**
 * Get jobs by campaign
 * GET /api/v1/jobs/campaign/:campaign_id
 */
router.get('/campaign/:campaign_id', async (req, res) => {
  try {
    const { campaign_id } = req.params;
    const campaignJobs = [];

    for (const [queueName, store] of Object.entries(jobStores)) {
      for (const [jobId, jobInfo] of store.entries()) {
        if (jobInfo.campaign_id === campaign_id) {
          campaignJobs.push({
            job_id: jobId,
            queue: queueName,
            ...jobInfo
          });
        }
      }
    }

    res.json({
      campaign_id,
      total: campaignJobs.length,
      jobs: campaignJobs.sort((a, b) =>
        new Date(b.created_at) - new Date(a.created_at)
      ),
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Campaign jobs error:', error);
    res.status(500).json({
      error: true,
      message: error.message
    });
  }
});

/**
 * Webhook for job completion
 * POST /api/v1/jobs/:job_id/webhook
 */
router.post('/:job_id/webhook', async (req, res) => {
  try {
    const { job_id } = req.params;
    const { webhook_url, events } = req.body;

    if (!webhook_url) {
      return res.status(400).json({
        error: true,
        message: 'webhook_url is required'
      });
    }

    // Register webhook (in production, store in database)
    // For now, we'll just return success
    res.json({
      job_id,
      webhook_registered: true,
      events: events || ['completed', 'failed'],
      webhook_url,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Webhook registration error:', error);
    res.status(500).json({
      error: true,
      message: error.message
    });
  }
});

/**
 * Cancel job
 * DELETE /api/v1/jobs/:job_id
 */
router.delete('/:job_id', async (req, res) => {
  try {
    const { job_id } = req.params;
    let cancelled = false;

    // Try to cancel from all queues
    for (const [queueName, queue] of Object.entries(queues)) {
      try {
        const jobs = await queue.getJobs(['active', 'wait']);
        const job = jobs.find(j => j.data.job_id === job_id);

        if (job) {
          await job.remove();
          cancelled = true;
          break;
        }
      } catch (error) {
        // Continue searching in other queues
      }
    }

    if (!cancelled) {
      return res.status(404).json({
        error: true,
        message: `Job ${job_id} not found or cannot be cancelled`
      });
    }

    res.json({
      job_id,
      cancelled: true,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Job cancellation error:', error);
    res.status(500).json({
      error: true,
      message: error.message
    });
  }
});

/**
 * Export store reference for other modules
 */
export function registerJobStore(queueName, store) {
  jobStores[queueName] = store;
}

export default router;
