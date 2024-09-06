"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Search,
  Cloud,
  CloudRain,
  Sun,
  Wind,
  Loader2,
  Droplets,
  Thermometer,
  CloudLightning,
  CloudSnow,
  Database,
} from "lucide-react";

type WeatherData = {
  coord: { lon: number; lat: number };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
  };
  visibility: number;
  wind: { speed: number; deg: number };
  clouds: { all: number };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
  cache_hit: boolean;
} | null;

const getWeatherIcon = (icon: string) => {
  switch (icon.slice(0, 2)) {
    case "01":
      return <Sun className="h-10 w-10 text-yellow-400" />;
    case "02":
    case "03":
    case "04":
      return <Cloud className="h-10 w-10 text-gray-400" />;
    case "09":
    case "10":
      return <CloudRain className="h-10 w-10 text-blue-400" />;
    case "11":
      return <CloudLightning className="h-10 w-10 text-yellow-500" />;
    case "13":
      return <CloudSnow className="h-10 w-10 text-blue-200" />;
    default:
      return <Cloud className="h-10 w-10 text-gray-400" />;
  }
};

const getBackgroundClass = (weatherId: number, temp: number) => {
  const tempClass =
    temp < 273.15
      ? "from-blue-200 to-blue-400"
      : temp < 283.15
        ? "from-green-200 to-green-400"
        : temp < 293.15
          ? "from-yellow-200 to-yellow-400"
          : temp < 303.15
            ? "from-orange-200 to-orange-400"
            : "from-red-200 to-red-400";

  if (weatherId >= 200 && weatherId < 300)
    return `bg-gradient-to-b from-gray-700 to-gray-900 ${getThunderstormAnimation()}`; // Thunderstorm
  if (weatherId >= 300 && weatherId < 500)
    return `bg-gradient-to-b ${tempClass} ${getDrizzleAnimation()}`; // Drizzle
  if (weatherId >= 500 && weatherId < 600)
    return `bg-gradient-to-b ${tempClass} ${getRainAnimation()}`; // Rain
  if (weatherId >= 600 && weatherId < 700)
    return `bg-gradient-to-b ${tempClass} ${getSnowAnimation()}`; // Snow
  if (weatherId >= 700 && weatherId < 800)
    return `bg-gradient-to-b from-gray-300 to-gray-500 ${getMistAnimation()}`; // Atmosphere
  if (weatherId === 800)
    return `bg-gradient-to-b ${tempClass} ${getClearAnimation()}`; // Clear
  if (weatherId > 800)
    return `bg-gradient-to-b ${tempClass} ${getCloudyAnimation()}`; // Clouds
  return `bg-gradient-to-b ${tempClass}`; // Default
};

const getThunderstormAnimation = () => "thunderstorm";
const getDrizzleAnimation = () => "drizzle";
const getRainAnimation = () => "rain";
const getSnowAnimation = () => "snow";
const getMistAnimation = () => "mist";
const getClearAnimation = () => "clear";
const getCloudyAnimation = () => "cloudy";

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

  const kelvinToFahrenheit = (kelvin: number) => {
    return Math.round(((kelvin - 273.15) * 9) / 5 + 32);
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
      <div className="absolute inset-0 pointer-events-none">
        {/* <div className="rain-container"></div> */}
        {/* <div className="snow-container"></div> */}
        {/* <div className="mist-container"></div> */}
        {/* <div className="lightning-container"></div> */}
      </div>
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

      {isLoading && (
        <Card className="w-full max-w-md text-center p-8">
          <Loader2 className="h-8 w-8 animate-spin mx-auto" />
          <p className="mt-4">Fetching weather data...</p>
        </Card>
      )}

      {error && (
        <Card className="w-full max-w-md text-center p-8">
          <p className="text-red-500">{error}</p>
        </Card>
      )}

      {weatherData && !isLoading && (
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>
                {weatherData.name}, {weatherData.sys.country}
              </span>
              {getWeatherIcon(weatherData.weather[0].icon)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center mb-4">
              <span className="text-4xl font-bold">
                {kelvinToFahrenheit(weatherData.main.temp)}°F
              </span>
              <span className="text-lg capitalize">
                {weatherData.weather[0].description}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center">
                <Thermometer className="h-5 w-5 mr-2 text-red-500" />
                <span>
                  Feels like: {kelvinToFahrenheit(weatherData.main.feels_like)}
                  °F
                </span>
              </div>
              <div className="flex items-center">
                <Wind className="h-5 w-5 mr-2 text-blue-500" />
                <span>
                  Wind: {Math.round(weatherData.wind.speed * 2.237)} mph
                </span>
              </div>
              <div className="flex items-center">
                <Droplets className="h-5 w-5 mr-2 text-blue-300" />
                <span>Humidity: {weatherData.main.humidity}%</span>
              </div>
              <div className="flex items-center">
                <Sun className="h-5 w-5 mr-2 text-yellow-500" />
                <span>Visibility: {weatherData.visibility / 1000} km</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end items-center text-sm text-gray-500">
            <Database className="h-4 w-4 mr-1" />
            {weatherData.cache_hit ? "Cached result < 30 minutes" : "Live data"}
          </CardFooter>
        </Card>
      )}
      <style>{`
        @keyframes rain {
          0% {
            transform: translateY(-100vh);
          }
          100% {
            transform: translateY(100vh);
          }
        }
        @keyframes snow {
          0% {
            transform: translateY(-100vh) rotate(0deg);
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
          }
        }
        @keyframes mist {
          0%,
          100% {
            opacity: 0.5;
          }
          50% {
            opacity: 0.8;
          }
        }
        @keyframes lightning {
          0%,
          100% {
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
        }
        .rain-container,
        .snow-container,
        .mist-container,
        .lightning-container {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          pointer-events: none;
        }
        .rain-container::before,
        .snow-container::before {
          content: "";
          position: absolute;
          width: 100%;
          height: 100%;
          background-image: radial-gradient(circle, #fff 1px, transparent 1px);
          background-size: 16px 16px;
        }
        .rain-container::before {
          animation: rain 1s linear infinite;
        }
        .snow-container::before {
          animation: snow 10s linear infinite;
        }
        .mist-container {
          background-color: rgba(255, 255, 255, 0.2);
          animation: mist 5s ease-in-out infinite;
        }
        .lightning-container {
          background-color: rgba(255, 255, 255, 0);
          animation: lightning 5s ease-in-out infinite;
        }
        .drizzle .rain-container::before {
          opacity: 0.5;
          animation-duration: 2s;
        }
        .rain .rain-container::before {
          opacity: 0.7;
        }
        .thunderstorm .rain-container::before {
          opacity: 0.9;
        }
        .thunderstorm .lightning-container {
          animation-duration: 3s;
        }
      `}</style>
    </div>
  );
}
