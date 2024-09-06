# frozen_string_literal: true

class WeatherController < ApplicationController
  def index
    # Clear the search term
    search_term = params[:address]
    search_term = search_term.strip if search_term.respond_to?(:strip)

    begin
      if search_term.present?
        weather_data = OpenWeather::Client.get_weather_by_address(search_term)
        render(json: weather_data)
      else
        render(json: { error: "Please provide a search term" }, status: :bad_request)
      end
    rescue OpenWeather::Types::AddressLookupError => e
      render(json: { error: e.message }, status: :unprocessable_entity)
    rescue OpenWeather::Types::WeatherApiError => e
      render(json: { error: e.message }, status: :service_unavailable)
    rescue OpenWeather::Types::WeatherDataNotFoundError => e
      render(json: { error: e.message }, status: :not_found)
    end
  end
end
