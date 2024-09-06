# frozen_string_literal: true

class CacheWeather < ApplicationRecord
  def valid_until
    created_at + OpenWeather::CACHE_EXPIRATION_TIME
  end
end
