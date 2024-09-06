# frozen_string_literal: true

module OpenWeather
  class Client
    class << self
      # Retrieves weather information for a given address.
      #
      # @param address [String] The address to fetch weather data for.
      # @return [Hash] A hash containing weather data and cache status.
      #   The hash includes all weather information from the API
      #   plus a "cache_hit" key indicating if the data was from cache.
      # @raise [OpenWeather::Types::AddressLookupError] If no geocoding data is found for the address.
      # @raise [OpenWeather::Types::WeatherDataNotFoundError] If no weather data is found for the address.
      # @raise [OpenWeather::Types::WeatherAPIError] If there's an error with the weather API.
      #
      # This method first attempts to geocode the given address, then checks if
      # cached weather data exists. If valid cached data is found, it's returned.
      # Otherwise, it fetches new weather data from the OpenWeather API, caches it,
      # and returns the result.
      def get_weather_by_address(address)
        geocoding_data = get_address_info(address)
        weather_data = if geocoding_data[:zip_code].present? && geocoding_data[:country_code].present?
          get_weather_by_zip_code(geocoding_data[:zip_code], geocoding_data[:country_code])
        else
          get_weather_by_coordinates(geocoding_data[:lat], geocoding_data[:lon])
        end

        # Handle no weather data found
        if weather_data["cod"] == 404
          raise OpenWeather::Types::WeatherDataNotFoundError
        end
        # Handle non-200 status codes
        if weather_data["cod"] != 200
          raise  OpenWeather::Types::WeatherApiError
        end

        CacheWeather.create(
          query: address,
          data: weather_data.to_json,
          zip_code: geocoding_data[:zip_code],
          latitude: geocoding_data[:lat],
          longitude: geocoding_data[:lon],
          country_code: geocoding_data[:country_code],
        )
        weather_data
      end

      private

      def get_weather(city)
        response = HTTParty.get(
          "#{OPEN_WEATHER_URL}?q=#{URI.encode_www_form_component(city)}&appid=#{OpenWeather::OPEN_WEATHER_API_KEY}",
        )
        response.parsed_response
      end

      def get_weather_by_coordinates(lat, lon)
        # Check cache first
        cache_weather = CacheWeather.find_by(latitude: lat, longitude: lon)
        if cache_weather.present? && cache_weather.valid_until > Time.now
          return JSON.parse(cache_weather.data).merge({
            "cache_hit": true,
          })
        end

        response = HTTParty.get("#{OPEN_WEATHER_URL}?lat=#{lat}&lon=#{lon}&appid=#{OpenWeather::OPEN_WEATHER_API_KEY}")
        response.parsed_response
      end

      def get_weather_by_zip_code(zip_code, country_code)
        # Check cache first
        cache_weather = CacheWeather.find_by(zip_code: zip_code, country_code: country_code)
        if cache_weather.present? && cache_weather.valid_until > Time.now
          return JSON.parse(cache_weather.data).merge({
            "cache_hit": true,
          })
        end

        response = HTTParty.get(
          "#{OPEN_WEATHER_URL}?zip=#{zip_code},#{country_code}&appid=#{OpenWeather::OPEN_WEATHER_API_KEY}",
        )
        response.parsed_response
      end

      def get_address_info(address)
        geocoding_data = Geocoder.search(address).first&.data
        if geocoding_data.present?
          postal_code = geocoding_data["address_components"].find do |component|
            component["types"].include?("postal_code")
          end
          country = geocoding_data["address_components"].find do |component|
            component["types"].include?("country")
          end
          {
            lat: geocoding_data["geometry"]["location"]["lat"],
            lon: geocoding_data["geometry"]["location"]["lng"],
            zip_code: postal_code.present? ? postal_code["long_name"] : nil,
            country_code: country.present? ? country["short_name"] : nil,
          }
        else
          raise OpenWeather::Types::AddressLookupError
        end
      end
    end
  end
end
