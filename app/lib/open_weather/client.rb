# frozen_string_literal: true

module OpenWeather
  class Client
    class << self
      def get_weather(city)
        response = HTTParty.get("#{OPEN_WEATHER_URL}?q=#{URI.encode_www_form_component(city)}&appid=#{OpenWeather::OPEN_WEATHER_API_KEY}")
        response.parsed_response
      end

      def get_weather_by_coordinates(lat, lon)
        response = HTTParty.get("#{OPEN_WEATHER_URL}?lat=#{lat}&lon=#{lon}&appid=#{OpenWeather::OPEN_WEATHER_API_KEY}")
        response.parsed_response
      end

      def get_weather_by_zip_code(zip_code, country_code)
        response = HTTParty.get("#{OPEN_WEATHER_URL}?zip=#{zip_code},#{country_code}&appid=#{OpenWeather::OPEN_WEATHER_API_KEY}")
        response.parsed_response
      end
    end
  end
end
