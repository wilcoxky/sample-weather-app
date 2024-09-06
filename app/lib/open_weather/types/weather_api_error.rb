# frozen_string_literal: true

module OpenWeather
  module Types
    class WeatherApiError < StandardError
      def message
        "Weather API error"
      end
    end
  end
end
