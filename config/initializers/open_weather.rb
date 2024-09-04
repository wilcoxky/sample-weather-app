# frozen_string_literal: true

module OpenWeather
  OPEN_WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather"
  OPEN_WEATHER_API_KEY = Rails.application.credentials.open_weather_api_key || "TODO"
end
