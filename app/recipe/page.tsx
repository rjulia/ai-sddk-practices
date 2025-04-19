'use client';

import { useEffect, useState } from 'react';
import { Recipe } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { useRouter } from 'next/navigation';

export default function RecipePage() {
  const router = useRouter();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const prompt = sessionStorage.getItem('recipePrompt');
        
        if (!prompt) {
          throw new Error('No recipe prompt found');
        }

        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            messages: [],
            prompt: prompt
          })
        });
        
        if (!response.ok) {
          throw new Error('Failed to generate recipe');
        }

        const data = await response.json();
        console.log("🚀 ~ fetchRecipe ~ data:", data)
        setRecipe(data);
      } catch (error) {
        console.error('Failed to fetch recipe:', error);
        setError(error instanceof Error ? error.message : 'Failed to load recipe');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-xl text-red-500">{error || 'Failed to load recipe'}</p>
        <button
          onClick={() => router.push('/')}
          className="text-primary hover:underline"
        >
          Go back and try again
        </button>
      </div>
    );
  }

  return (
    <main className="min-h-screen p-4 md:p-8 bg-background">
      {/* Hero Section */}
      <div 
        className="relative h-[50vh] bg-cover bg-center mb-8"
        style={{ backgroundImage: `url(${recipe.image})` }}
      >
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white text-center">
            {recipe.name}
          </h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        {/* Ingredients */}
        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Ingredients</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index} className="flex justify-between items-center">
                <span>{ingredient.name}</span>
                <span className="text-muted-foreground">{ingredient.amount}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* Steps */}
        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Instructions</h2>
          <ol className="space-y-4">
            {recipe.steps.map((step, index) => (
              <li key={index} className="flex gap-4">
                <span className="font-bold min-w-[2rem]">{index + 1}.</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </Card>

        {/* Video Links */}
        {recipe.linksVideoYouTube.length > 0 && (
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Helpful Videos</h2>
            <ul className="space-y-2">
              {recipe.linksVideoYouTube.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </Card>
        )}

        <div className="text-center pt-8">
          <button
            onClick={() => router.push('/chat-recipe')}
            className="text-primary hover:underline"
          >
            Generate another recipe
          </button>
        </div>
      </div>
    </main>
  );
}