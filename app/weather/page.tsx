'use client';

import { useState } from 'react';
import { Weather } from '@/lib/types';
import { Cloud, CloudRain, CloudSnow, CloudSun, Sun, Wind } from 'lucide-react';
import Image from 'next/image';

// Function to determine weather icon based on weather description
const getWeatherIcon = (weatherText: string) => {
  const weatherLower = weatherText.toLowerCase();
  
  if (weatherLower.includes('sunny') || weatherLower.includes('clear')) {
    return <Sun className="w-12 h-12 text-yellow-500" />;
  } else if (weatherLower.includes('cloud') && weatherLower.includes('sun')) {
    return <CloudSun className="w-12 h-12 text-blue-400" />;
  } else if (weatherLower.includes('cloud')) {
    return <Cloud className="w-12 h-12 text-gray-400" />;
  } else if (weatherLower.includes('rain')) {
    return <CloudRain className="w-12 h-12 text-blue-500" />;
  } else if (weatherLower.includes('snow')) {
    return <CloudSnow className="w-12 h-12 text-blue-200" />;
  } else if (weatherLower.includes('wind')) {
    return <Wind className="w-12 h-12 text-gray-500" />;
  } else {
    // Default icon
    return <Cloud className="w-12 h-12 text-gray-400" />;
  }
};

export default function WeatherPage() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<Weather | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/weather', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ city }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }

      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError('Failed to get weather information. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Weather Forecast</h1>
        
        <div className="max-w-md mx-auto">
          <form onSubmit={handleSubmit} className="space-y-4 mb-8">
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                Enter Location
              </label>
              <input
                type="text"
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter city or address"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-300"
            >
              {loading ? 'Getting Weather...' : 'Get Weather'}
            </button>
          </form>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          {weather && (
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="space-y-4">
                <div className="text-center">
                  <p className="text-md font-semibold text-gray-800">{weather.description}</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    {getWeatherIcon(weather.weather)}
                    <p className="text-2xl font-semibold text-gray-800">{weather.weather}</p>
                  </div>
                  <p className="text-5xl font-bold text-blue-600">{weather.temperature}°C</p>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="text-center">
                    <p className="text-gray-500">Humidity</p>
                    <p className="text-xl font-semibold">{weather.humidity}%</p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-500">Wind Speed</p>
                    <p className="text-xl font-semibold">{weather.wind} km/h</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Attractions Section */}
          {weather && weather.attractions && weather.attractions.length > 0 && (
            <div className="mt-8">
              <div className="text-center">
                <p className="text-md text-gray-500">{weather.descriptionCity}</p>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Popular Attractions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {weather.attractions.map((attraction, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="h-48 overflow-hidden">
                      <Image 
                        src={attraction.image.url} 
                        alt={attraction.image.alt}
                        width={400}
                        height={200}
                        className="w-full h-full object-cover"
                        onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                          // Fallback image if the provided image URL fails to load
                          (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x200?text=Attraction+Image';
                        }}
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">{attraction.name}</h3>
                      <p className="text-gray-600">{attraction.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
