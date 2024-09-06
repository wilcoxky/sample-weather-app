# frozen_string_literal: true

module OpenWeather
  module Types
    class AddressLookupError < StandardError
      def message
        "No geocoding data found for address"
      end
    end
  end
end
