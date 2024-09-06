"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Loader2 } from "lucide-react";
import { WeatherData } from "@/types/weather";
import { getBackgroundClass } from "@/helpers/weather";
import { WeatherCard } from "./weather-card";
import { ErrorCard } from "./error-card";
import { LoadingCard } from "./loading-card";

export function WeatherSearch() {
  const [address, setAddress] = useState("");
  const [weatherData, setWeatherData] = useState<WeatherData>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (address.trim()) {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`/weather?address=${address}`);

        if (response.ok) {
          const data = await response.json();
          setWeatherData(data);
          setIsLoading(false);
        } else {
          setError("Failed to fetch weather data");
          setWeatherData(null);
          setIsLoading(false);
        }
      } catch (error) {
        setError("Failed to fetch weather data");
        setWeatherData(null);
        setIsLoading(false);
      }
    }
  };

  const backgroundClass = useMemo(() => {
    return weatherData
      ? getBackgroundClass(weatherData.weather[0].id, weatherData.main.temp)
      : "bg-gradient-to-b from-blue-100 to-blue-300";
  }, [weatherData]);

  return (
    <div
      className={`min-h-screen ${backgroundClass} p-4 flex flex-col items-center justify-start pt-20 transition-colors duration-500`}
    >
      <form onSubmit={handleSearch} className="w-full max-w-md mb-8">
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Enter an address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="flex-grow"
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Search className="h-4 w-4 mr-2" />
            )}
            {isLoading ? "Searching" : "Search"}
          </Button>
        </div>
      </form>

      {isLoading && <LoadingCard />}
      {error && <ErrorCard error={error} />}
      {weatherData && !isLoading && <WeatherCard weatherData={weatherData} />}
    </div>
  );
}
