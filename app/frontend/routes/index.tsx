import { createFileRoute } from "@tanstack/react-router";
import { WeatherSearch } from "@/components/weather-search";

export const Route = createFileRoute("/")({
  component: WeatherSearch,
});
