import { Currency } from 'lucide-react';
import { z } from 'zod';

export const RecipeSchema = z.object({
  name: z.string(),
  ingredients: z.array(z.object({
    name: z.string(),
    amount: z.string()
  })),
  steps: z.array(z.string()),
  linksVideoYouTube: z.array(z.object({
    title: z.string(),
    url: z.string()
  })),
  imageUnsplash: z.string()
});

export const ImageRecipeDescriptionSchema = z.object({
  description: z.string(),
  amount: z.number(),
  currency: z.string(),
  price: z.number(),
  type: z.enum(['meals and refreshments', 'Hotel accommodation', 'transfer to or from the airport to the place to accommodation', 'communication', 'other'])
});

export const WeatherSchema = z.object({
  description: z.string(),
  descriptionCity: z.string(),
  weather: z.string(),
  temperature: z.number(),
  wind: z.number(),
  windSpeed: z.number(),
  humidity: z.number(),
  attractions: z.array(z.object({
    name: z.string().describe("The name of the attraction"),
    description: z.string().describe("The description of the attraction"),
    image: z.object({
      url: z.string(),
      alt: z.string()
    })
  }))
});

export type Recipe = z.infer<typeof RecipeSchema>;
export type ImageRecipeDescription = z.infer<typeof ImageRecipeDescriptionSchema>;
export type Weather = z.infer<typeof WeatherSchema>;