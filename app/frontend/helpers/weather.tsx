import { Cloud, CloudLightning, CloudRain, CloudSnow, Sun } from "lucide-react";

export const kelvinToFahrenheit = (kelvin: number) => {
  return Math.round(((kelvin - 273.15) * 9) / 5 + 32);
};

export const getBackgroundClass = (weatherId: number, temp: number) => {
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

export const getWeatherIcon = (icon: string) => {
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
