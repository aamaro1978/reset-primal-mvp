import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION || 'us-east-1'
});

const BUCKET_NAME = process.env.S3_BUCKET || 'reset-primal-assets';
const CDN_BASE_URL = process.env.CDN_BASE_URL || `https://${BUCKET_NAME}.s3.amazonaws.com`;

/**
 * Upload image to S3
 */
export async function uploadToS3(imageBuffer, campaignId, platform, series) {
  try {
    const timestamp = new Date().toISOString().slice(0, 10);
    const fileId = uuidv4();
    const fileName = `${timestamp}/${campaignId}/${series}/${platform}/${fileId}.jpg`;

    const params = {
      Bucket: BUCKET_NAME,
      Key: fileName,
      Body: imageBuffer,
      ContentType: 'image/jpeg',
      CacheControl: 'max-age=31536000',
      Metadata: {
        campaign: campaignId,
        platform: platform,
        series: series,
        timestamp: new Date().toISOString()
      }
    };

    const result = await s3.upload(params).promise();

    return {
      bucket: result.Bucket,
      key: result.Key,
      url: result.Location,
      cdn_url: `${CDN_BASE_URL}/${result.Key}`,
      etag: result.ETag,
      timestamp: new Date().toISOString()
    };

  } catch (error) {
    console.error('S3 upload error:', error);
    throw new Error(`Failed to upload to S3: ${error.message}`);
  }
}

/**
 * Download image from URL and return buffer
 */
export async function downloadImage(url) {
  try {
    const response = await axios.get(url, {
      responseType: 'arraybuffer',
      timeout: 30000
    });
    return Buffer.from(response.data);
  } catch (error) {
    console.error('Image download error:', error);
    throw new Error(`Failed to download image: ${error.message}`);
  }
}

/**
 * Get presigned URL for accessing S3 objects
 */
export async function getPresignedUrl(key, expiresIn = 3600) {
  try {
    const params = {
      Bucket: BUCKET_NAME,
      Key: key,
      Expires: expiresIn
    };

    const url = s3.getSignedUrl('getObject', params);
    return url;
  } catch (error) {
    console.error('Presigned URL generation error:', error);
    throw new Error(`Failed to generate presigned URL: ${error.message}`);
  }
}

/**
 * Check if file exists in S3
 */
export async function fileExistsInS3(key) {
  try {
    await s3.headObject({
      Bucket: BUCKET_NAME,
      Key: key
    }).promise();
    return true;
  } catch (error) {
    if (error.code === 'NotFound') {
      return false;
    }
    throw error;
  }
}

/**
 * Delete file from S3
 */
export async function deleteFromS3(key) {
  try {
    await s3.deleteObject({
      Bucket: BUCKET_NAME,
      Key: key
    }).promise();
    return true;
  } catch (error) {
    console.error('S3 delete error:', error);
    throw new Error(`Failed to delete from S3: ${error.message}`);
  }
}

/**
 * List files in S3 by campaign
 */
export async function listCampaignAssets(campaignId) {
  try {
    const params = {
      Bucket: BUCKET_NAME,
      Prefix: `*/${campaignId}/`
    };

    const result = await s3.listObjectsV2(params).promise();

    return result.Contents.map(obj => ({
      key: obj.Key,
      size: obj.Size,
      lastModified: obj.LastModified,
      url: `${CDN_BASE_URL}/${obj.Key}`
    }));
  } catch (error) {
    console.error('S3 list error:', error);
    throw new Error(`Failed to list S3 objects: ${error.message}`);
  }
}

export default {
  uploadToS3,
  downloadImage,
  getPresignedUrl,
  fileExistsInS3,
  deleteFromS3,
  listCampaignAssets
};
