'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from 'next/navigation';

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
    <main className="min-h-screen flex items-center justify-center p-4 md:p-8 bg-background">
      <div className="w-full max-w-2xl space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">AI Recipe Generator</h1>
          <p className="text-lg text-muted-foreground">
            Enter what kind of recipe you'd like to create
          </p>
        </div>

        <div className="space-y-4">
          <Textarea
            placeholder="Example: A traditional Italian tiramisu recipe, or a spicy Thai green curry..."
            className="min-h-[120px] text-lg p-4"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          
          <Button 
            size="lg"
            onClick={handleSubmit}
            className="w-full text-lg"
            disabled={!prompt.trim()}
          >
            Generate Recipe
          </Button>
        </div>
      </div>
    </main>
  );
}