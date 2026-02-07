import sharp from 'sharp';
import axios from 'axios';

/**
 * Process image: download, resize, crop, watermark
 */
export async function processImage(imageUrl, width, height, campaignId, copy) {
  try {
    // Download image
    const response = await axios.get(imageUrl, {
      responseType: 'arraybuffer',
      timeout: 30000
    });
    let imageBuffer = Buffer.from(response.data);

    // Resize and crop
    imageBuffer = await sharp(imageBuffer)
      .resize(width, height, {
        fit: 'cover',
        position: 'center'
      })
      .jpeg({ quality: 85, progressive: true })
      .toBuffer();

    // Add watermark
    imageBuffer = await addWatermark(imageBuffer, campaignId);

    return imageBuffer;

  } catch (error) {
    console.error('Image processing error:', error);
    throw new Error(`Failed to process image: ${error.message}`);
  }
}

/**
 * Add watermark to image
 */
export async function addWatermark(imageBuffer, campaignId) {
  try {
    const watermarkText = `© Reset Primal | ${campaignId}`;
    
    // Create SVG watermark
    const watermarkSvg = `
      <svg width="1080" height="1080">
        <text x="540" y="1050" 
              font-family="Arial, sans-serif" 
              font-size="14" 
              fill="rgba(255, 255, 255, 0.5)" 
              text-anchor="middle">
          ${watermarkText}
        </text>
      </svg>
    `;

    const watermarkBuffer = Buffer.from(watermarkSvg);

    // Overlay watermark
    const processedImage = await sharp(imageBuffer)
      .composite([
        {
          input: watermarkBuffer,
          bottom: 10,
          right: 10,
          gravity: 'southeast'
        }
      ])
      .toBuffer();

    return processedImage;

  } catch (error) {
    console.error('Watermark error:', error);
    // Return original if watermark fails
    return imageBuffer;
  }
}

/**
 * Crop image to multiple formats
 */
export async function cropForPlatforms(imageBuffer) {
  const platforms = {
    instagram: { width: 1080, height: 1080 },
    email: { width: 600, height: 600 },
    landing: { width: 1920, height: 1080 },
    paid: { width: 1200, height: 628 },
    youtube: { width: 1280, height: 720 }
  };

  const croppedImages = {};

  for (const [platform, size] of Object.entries(platforms)) {
    try {
      croppedImages[platform] = await sharp(imageBuffer)
        .resize(size.width, size.height, {
          fit: 'cover',
          position: 'center'
        })
        .jpeg({ quality: 85, progressive: true })
        .toBuffer();
    } catch (error) {
      console.error(`Failed to crop for ${platform}:`, error);
    }
  }

  return croppedImages;
}

/**
 * Add text overlay to image
 */
export async function addTextOverlay(imageBuffer, text, options = {}) {
  try {
    const {
      x = 50,
      y = 50,
      fontSize = 48,
      fontColor = '#FFFFFF',
      maxWidth = 900,
      backgroundColor = 'rgba(0, 0, 0, 0.3)'
    } = options;

    // Estimate text height
    const estimatedHeight = Math.ceil((text.length / (maxWidth / (fontSize * 0.6))) * fontSize);

    const svg = `
      <svg width="1080" height="1080">
        <rect x="${x}" y="${y}" width="${maxWidth}" height="${estimatedHeight + 20}" 
              fill="${backgroundColor}" rx="8"/>
        <text x="${x + 10}" y="${y + fontSize}" 
              font-family="Arial, sans-serif" 
              font-size="${fontSize}" 
              fill="${fontColor}"
              word-wrap="break-word"
              font-weight="bold">
          <tspan x="${x + 10}" dy="0">${text.substring(0, 30)}</tspan>
          ${text.length > 30 ? `<tspan x="${x + 10}" dy="${fontSize}">${text.substring(30, 60)}</tspan>` : ''}
        </text>
      </svg>
    `;

    const overlayBuffer = Buffer.from(svg);

    const processedImage = await sharp(imageBuffer)
      .composite([
        {
          input: overlayBuffer
        }
      ])
      .toBuffer();

    return processedImage;

  } catch (error) {
    console.error('Text overlay error:', error);
    return imageBuffer;
  }
}

/**
 * Compress image for web
 */
export async function compressImage(imageBuffer, quality = 75) {
  try {
    const compressed = await sharp(imageBuffer)
      .jpeg({ quality, progressive: true })
      .toBuffer();

    return {
      original: imageBuffer.length,
      compressed: compressed.length,
      ratio: (1 - compressed.length / imageBuffer.length) * 100,
      buffer: compressed
    };

  } catch (error) {
    console.error('Compression error:', error);
    throw new Error(`Failed to compress image: ${error.message}`);
  }
}

/**
 * Generate image metadata
 */
export async function getImageMetadata(imageBuffer) {
  try {
    const metadata = await sharp(imageBuffer).metadata();
    return {
      width: metadata.width,
      height: metadata.height,
      format: metadata.format,
      space: metadata.space,
      channels: metadata.channels,
      depth: metadata.depth,
      density: metadata.density,
      hasAlpha: metadata.hasAlpha,
      size: imageBuffer.length
    };
  } catch (error) {
    console.error('Metadata extraction error:', error);
    throw new Error(`Failed to extract metadata: ${error.message}`);
  }
}

export default {
  processImage,
  addWatermark,
  cropForPlatforms,
  addTextOverlay,
  compressImage,
  getImageMetadata
};
