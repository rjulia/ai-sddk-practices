import { google } from '@ai-sdk/google';
import { generateObject, generateText } from 'ai';
import { ImageRecipeDescriptionSchema } from '@/lib/types';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { URL } from 'node:url';



export async function POST(req: Request) {

  const systemPrompt = `You will receive an image. Please create an alt text for the image. Be concise. Use adjectives only necessary. Do not pass 160 characters. Use simple language.`;
  const { image } = await req.json();


  const imagePath = path.join(process.cwd(), 'public', image.path);
  console.log("🚀 ~ POST ~ imagePath:", imagePath)
  const imageAsUint8Array = readFileSync(imagePath);
  const { object } = await generateObject({
    model: google('gemini-1.5-flash'),
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
            mimeType: 'image/png',
          }
        ]
      },
    ]
  })
  console.log("🚀 ~ POST ~ object:", object)

  try {

    return new Response(JSON.stringify(object), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Failed to generate text from image' }),
      { status: 500 }
    );
  }
}