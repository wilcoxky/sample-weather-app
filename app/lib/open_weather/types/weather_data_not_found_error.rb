# frozen_string_literal: true

module OpenWeather
  module Types
    class WeatherDataNotFoundError < StandardError
      def message
        "No weather data found for address"
      end
    end
  end
end
