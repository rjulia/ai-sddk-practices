import { google } from '@ai-sdk/google';
import { generateObject } from 'ai';
import { RecipeSchema } from '@/lib/types';


export async function POST(req: Request) {
  const { messages, prompt } = await req.json();
  const { object } = await generateObject({
    model: google('gemini-1.5-flash'),
    schema: RecipeSchema,
    prompt: prompt,
  })
  
  try {
    
    return new Response(JSON.stringify(object), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Failed to generate recipe' }),
      { status: 500 }
    );
  }
}