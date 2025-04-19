'use client';

import MyDropzone from '@/components/drag-drop/drag-drop';

export default function Home() {
  


  return (
    <main className="min-h-screen flex items-center justify-center p-4 md:p-8 bg-background">
      <div className="w-full max-w-2xl space-y-8">
        <MyDropzone />
      </div>
    </main>
  );
}