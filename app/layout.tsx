import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, NavigationMenuViewport } from '@/components/ui/navigation-menu';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Sparkles } from 'lucide-react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AI-AWWWS - AI Recipes',
  description: 'AI-powered recipe and travel assistant',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Sparkles className="h-8 w-8 text-yellow-300" />
                <h1 className="text-2xl font-bold tracking-tight">AI-AWWWS</h1>
              </div>
              
              <NavigationMenu className="bg-transparent">
                <NavigationMenuList className="space-x-4">
                  <NavigationMenuItem>
                    <NavigationMenuLink
                      href='/'
                      className="text-white hover:text-yellow-300 transition-colors duration-200 font-medium"
                    >
                      Home
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink
                      href='/chat-recipe'
                      className="text-white hover:text-yellow-300 transition-colors duration-200 font-medium"
                    >
                      Chat Recipe
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink
                      href='/expenses-reader'
                      className="text-white hover:text-yellow-300 transition-colors duration-200 font-medium"
                    >
                      Expenses Reader
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink
                      href='/weather'
                      className="text-white hover:text-yellow-300 transition-colors duration-200 font-medium"
                    >
                      Weather
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </NavigationMenuList>
                <NavigationMenuViewport />
              </NavigationMenu>
            </div>
          </div>
        </header>
        
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}
