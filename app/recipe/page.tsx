'use client';

import { useEffect, useState } from 'react';
import { Recipe } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { Sparkles, ArrowLeft, Utensils, List, PlayCircle } from 'lucide-react';

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
      <div className="min-h-screen bg-gradient-to-b from-white to-purple-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600"></div>
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-purple-50 flex flex-col items-center justify-center gap-4">
        <div className="bg-white p-8 rounded-xl shadow-md max-w-md text-center">
          <p className="text-xl text-red-500 mb-4">{error || 'Failed to load recipe'}</p>
          <button
            onClick={() => router.push('/chat-recipe')}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300 flex items-center gap-2 mx-auto"
          >
            <ArrowLeft className="h-5 w-5" />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div 
          className="relative h-[40vh] bg-cover bg-center rounded-xl overflow-hidden mb-8 shadow-lg"
          style={{ backgroundImage: `url(${recipe.imageUnsplash})` }}
        >
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="text-center">
              <div className="inline-flex items-center justify-center mb-2">
                <Sparkles className="h-8 w-8 text-yellow-400 mr-2" />
                <h1 className="text-4xl md:text-5xl font-bold text-white">
                  {recipe.name}
                </h1>
              </div>
              <p className="text-white/80 text-lg">AI-Generated Recipe</p>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Ingredients */}
          <Card className="p-6 border border-gray-200 shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-2 mb-4">
              <Utensils className="h-6 w-6 text-purple-600" />
              <h2 className="text-2xl font-semibold text-gray-800">Ingredients</h2>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded-md">
                  <span className="font-medium">{ingredient.name}</span>
                  <span className="text-gray-600">{ingredient.amount}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Steps */}
          <Card className="p-6 border border-gray-200 shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-2 mb-4">
              <List className="h-6 w-6 text-indigo-600" />
              <h2 className="text-2xl font-semibold text-gray-800">Instructions</h2>
            </div>
            <ol className="space-y-4">
              {recipe.steps.map((step, index) => (
                <li key={index} className="flex gap-4 p-3 bg-gray-50 rounded-md">
                  <span className="font-bold min-w-[2rem] text-purple-600">{index + 1}.</span>
                  <span className="text-gray-700">{step}</span>
                </li>
              ))}
            </ol>
          </Card>

          {/* Video Links */}
          {recipe.linksVideoYouTube.length > 0 && (
            <Card className="p-6 border border-gray-200 shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-2 mb-4">
                <PlayCircle className="h-6 w-6 text-purple-600" />
                <h2 className="text-2xl font-semibold text-gray-800">Helpful Videos</h2>
              </div>
              <ul className="space-y-2">
                {recipe.linksVideoYouTube.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-600 hover:text-indigo-600 hover:underline flex items-center gap-2 p-2 rounded-md hover:bg-gray-50 transition-colors"
                    >
                      <PlayCircle className="h-4 w-4" />
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
              className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300 inline-flex items-center gap-2"
            >
              <Sparkles className="h-5 w-5" />
              Generate Another Recipe
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}