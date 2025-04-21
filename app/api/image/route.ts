import { google } from '@ai-sdk/google';
import { generateObject, generateText } from 'ai';
import { ImageRecipeDescriptionSchema } from '@/lib/types';

export async function POST(req: Request) {
  const systemPrompt = `You will receive an image. Please create an alt text for the image. Be concise. Use adjectives only necessary. Do not pass 160 characters. Use simple language.`;
  
  try {
    const { imageData, mimeType } = await req.json();
    
    // Convert the array back to Uint8Array
    const imageAsUint8Array = new Uint8Array(imageData);
    
    console.log("🚀 ~ POST ~ Processing image with mimeType:", mimeType);
    
    const { object } = await generateObject({
      model: google('gemini-2.0-flash-001'),
      schema: ImageRecipeDescriptionSchema,
      messages: [
        {
          role: 'system',
          content: systemPrompt,
        },
        {
          role: 'user',
          content: [
            {
              type: 'image',
              image: imageAsUint8Array,
              mimeType: mimeType || 'image/png', // Use provided mimeType or default to png
            }
          ]
        },
      ]
    });
    
    console.log("🚀 ~ POST ~ object:", object);

    return new Response(JSON.stringify(object), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("Error processing image:", error);
    return new Response(
      JSON.stringify({ error: 'Failed to generate text from image' }),
      { status: 500 }
    );
  }
}