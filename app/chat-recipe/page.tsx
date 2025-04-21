'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from 'next/navigation';
import { Sparkles, Send } from 'lucide-react';

export default function Home() {
  const router = useRouter();
  const [prompt, setPrompt] = useState('');

  const handleSubmit = () => {
    if (!prompt.trim()) return;
    
    // Store the prompt in sessionStorage to access it on the recipe page
    sessionStorage.setItem('recipePrompt', prompt);
    router.push('/recipe');
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-purple-50">
      <div className="container mx-auto px-4 py-12">
        <section className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center mb-4">
              <Sparkles className="h-10 w-10 text-yellow-400 mr-2" />
              <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
                AI Recipe Generator
              </h1>
            </div>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Enter what kind of recipe you&apos;d like to create
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-8 mb-8">
            <div className="space-y-6">
              <Textarea
                placeholder="Example: A traditional Italian tiramisu recipe, or a spicy Thai green curry..."
                className="min-h-[150px] text-lg p-4 border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
              
              <Button 
                size="lg"
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                disabled={!prompt.trim()}
              >
                <Send className="h-5 w-5" />
                Generate Recipe
              </Button>
            </div>
          </div>
          
          <div className="text-center text-gray-600">
            <p>Our AI will create a detailed recipe based on your description</p>
          </div>
        </section>
      </div>
    </main>
  );
}