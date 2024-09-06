import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Thermometer, Wind, Droplets, Sun, Database } from "lucide-react";
import { WeatherData } from "@/types/weather";
import { getWeatherIcon, kelvinToFahrenheit } from "@/helpers/weather";

interface WeatherCardProps {
  weatherData: WeatherData;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({ weatherData }) => {
  if (!weatherData) return null;
  return (
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
            <span>Wind: {Math.round(weatherData.wind.speed * 2.237)} mph</span>
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
  );
};
