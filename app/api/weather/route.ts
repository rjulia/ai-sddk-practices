import { WeatherSchema } from "@/lib/types";
import { anthropic } from "@ai-sdk/anthropic";
import { generateText, streamText, tool, Output, generateObject } from 'ai';
import { z } from 'zod';

const getWeather = async (city: string) => {
  console.log("🚀 ~ getWeather ~ city:", city)
  const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${process.env.OPENWEATHER_API_KEY}&q=${city}&aqi=no`);
  const data = await response.json();
  return data;
};

const getWeatherTool = tool({
  description: "Get the current weather in the specified city",
  parameters: z.object({
    city: z.string().describe('The location to get the weather for'),
  }),
  execute: async ({ city }) => {
    const weather = await getWeather(city);
    return `The weather in ${city} is ${weather.current.temp_c}°C, the wind is ${weather.current.wind_kph} km/h, the humidity is ${weather.current.humidity}%`;
  },
});

const model = anthropic("claude-3-5-haiku-latest");
export async function POST(req: Request) {

  try {
    const { city } = await req.json();

    const { text } = await generateText({
      model,
      prompt: `What is the weather in ${city}?, please be specific in your response, no ask me anything else, just the weather, use not more than 100 words. It is a result to show in website not in a chat`,
      tools: {
        getWeather: getWeatherTool,
      },
      maxSteps: 2,
    });

    console.log("🚀 ~ POST ~ experimental_output:", text)
    const { object } = await generateObject({
      model,
      prompt: `Base in this information: ${text}, What is the weather in ${city} and what attractions should I visit?`,
      schema: WeatherSchema,
    })
    const objectData = object;
    console.log("🚀 ~ POST ~ objectData:", objectData)
    return new Response(JSON.stringify({
      description: text,
      descriptionCity: objectData.description,
      weather: objectData.weather,
      temperature: objectData.temperature,
      wind: objectData.wind,
      attractions: objectData.attractions,
    }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("Error processing request:", error);
    return new Response(
      JSON.stringify({ error: 'Failed to process request' }),
      { status: 500 }
    );
  }
}