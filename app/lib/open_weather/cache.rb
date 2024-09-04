# frozen_string_literal: true

Module OpenWeather
module Cache
  def get(query:, latitude:, longitude:, zip_code:)
    CacheWeather.find_by(query: query, latitude: latitude, longitude: longitude, zip_code: zip_code)
  end

  def set(query:, latitude:, longitude:, zip_code:, data:)
    CacheWeather.create(query: query, latitude: latitude, longitude: longitude, zip_code: zip_code, data: data)
  end
end
