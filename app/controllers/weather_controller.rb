# frozen_string_literal: true

class WeatherController < ApplicationController
  def index
    search_term = params[:search]

    if search_term.present?
      weather_data = OpenWeather.get_weather(search_term)
      render(json: weather_data)
    else
      render(json: { error: "Please provide a search term" }, status: :unprocessable_entity)
    end
  end
end
