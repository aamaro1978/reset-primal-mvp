import { OpenAI } from 'openai';

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

/**
 * Generate visual brief from marketing copy using GPT-4
 * Converts copy into detailed DALL-E 3 prompts
 */
export async function generateVisualBrief(copy, style = 'minimalist') {
  try {
    const systemPrompt = `You are an expert visual designer and AI art director.
Your task is to convert marketing copy into detailed, vivid DALL-E 3 prompts.

Guidelines:
- Be specific and detailed
- Include color palette, lighting, composition
- Reference style/mood (minimalist, vibrant, professional, etc.)
- Mention realistic or artistic rendering
- Include "high quality, 8k resolution" for best results
- Keep under 150 words for optimal DALL-E 3 generation`;

    const userPrompt = `Convert this marketing copy into a detailed visual prompt for DALL-E 3:

Copy: "${copy}"

Style: ${style}

Requirements:
1. Extract the emotional core (curiosity, pain-point, solution, transformation)
2. Suggest visual elements that reinforce the message
3. Specify composition and framing
4. Include lighting and mood
5. Add color palette recommendations

Return ONLY the visual prompt, ready for DALL-E 3.`;

    const response = await client.messages.create({
      model: 'gpt-4-turbo-preview',
      max_tokens: 300,
      messages: [
        {
          role: 'user',
          content: userPrompt
        }
      ],
      system: systemPrompt
    });

    const visualBrief = response.content[0].type === 'text' 
      ? response.content[0].text 
      : '';

    return visualBrief;

  } catch (error) {
    console.error('Error generating visual brief:', error);
    // Fallback prompt if GPT-4 fails
    return generateFallbackPrompt(copy, style);
  }
}

/**
 * Fallback prompt generation if API fails
 */
function generateFallbackPrompt(copy, style) {
  const styleDescriptions = {
    'minimalist': 'clean, minimalist design with high contrast, simple geometric shapes, white space',
    'vibrant': 'vibrant colors, energetic, dynamic composition, bold typography',
    'professional': 'professional, corporate aesthetic, clean lines, sophisticated color palette',
    'modern': 'modern design, sleek, contemporary, trending aesthetic',
    'artistic': 'artistic, painterly style, expressive, creative composition'
  };

  const styleDesc = styleDescriptions[style] || styleDescriptions['minimalist'];

  return `A ${styleDesc} image representing: "${copy}". High quality, 8k resolution, professional product photography. Modern design, contemporary aesthetic.`;
}

/**
 * Generate multiple visual variations
 */
export async function generateVisualVariations(copy, style = 'minimalist', count = 3) {
  const variations = [];
  const basePrompt = await generateVisualBrief(copy, style);

  // Generate variations by adding subtle modifiers
  const modifiers = [
    'bright, well-lit, professional photography',
    'dramatic lighting, cinematic, bold',
    'soft lighting, warm tones, welcoming'
  ];

  for (let i = 0; i < count; i++) {
    const variation = `${basePrompt}. ${modifiers[i % modifiers.length]}`;
    variations.push({
      index: i + 1,
      prompt: variation
    });
  }

  return variations;
}

export default {
  generateVisualBrief,
  generateVisualVariations
};
