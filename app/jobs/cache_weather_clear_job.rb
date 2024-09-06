# frozen_string_literal: true

class CacheWeatherClearJob < ApplicationJob
  queue_as :default

  def perform(*args)
    Rails.logger.info("CacheWeatherClearJob is running")
    OpenWeather::Cache.clear_expired_cache
  end
end
