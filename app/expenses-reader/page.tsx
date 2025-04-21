'use client';

import MyDropzone from '@/components/drag-drop/drag-drop';
import { Sparkles, Receipt, Upload } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-purple-50">
      <div className="container mx-auto px-4 py-12">
        <section className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center mb-4">
              <Sparkles className="h-10 w-10 text-yellow-400 mr-2" />
              <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
                Expenses Reader
              </h1>
            </div>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Upload receipts and documents to extract expense information
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-8 mb-8">
            <div className="flex items-center gap-2 mb-6">
              <Receipt className="h-6 w-6 text-purple-600" />
              <h2 className="text-2xl font-semibold text-gray-800">Upload Your Document</h2>
            </div>
            
            <div className="space-y-6">
              <MyDropzone />
            </div>
            
            <div className="mt-6 text-center text-gray-600">
              <p className="flex items-center justify-center gap-2">
                <Upload className="h-4 w-4" />
                Drag and drop your receipt or click to browse
              </p>
            </div>
          </div>
          
          <div className="text-center text-gray-600">
            <p>Our AI will analyze your document and extract expense details</p>
          </div>
        </section>
      </div>
    </main>
  );
}