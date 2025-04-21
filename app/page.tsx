'use client';

import MyDropzone from '@/components/drag-drop/drag-drop';
import { Sparkles, Code, Image, MessageSquare } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-purple-50">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <div className="inline-flex items-center justify-center mb-4">
            <Sparkles className="h-10 w-10 text-yellow-400 mr-2" />
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
              Welcome to AI-AWWWS
            </h1>
          </div>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto mb-8">
            Explore the power of AI SDK with practical examples and hands-on tools
          </p>
          <div className="flex justify-center">
            <Link href="/chat-recipe" className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300">
              Get Started
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section className="grid md:grid-cols-3 gap-8 mb-16">
          <Link href="/chat-recipe">
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <MessageSquare className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Chat Recipe</h3>
              <p className="text-gray-600">Generate recipes and meal plans using AI-powered chat interfaces.</p>
            </div>
          </Link>
          
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="bg-indigo-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <Image className="h-6 w-6 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Image Analysis</h3>
            <p className="text-gray-600">Upload images and get AI-powered descriptions and insights.</p>
          </div>
          <Link href="/expenses-reader">
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <Code className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Expenses Reader</h3>
            <p className="text-gray-600">Extract and analyze expense information from receipts and documents.</p>
          </div>
          </Link>
        </section>

      </div>
    </main>
  );
}