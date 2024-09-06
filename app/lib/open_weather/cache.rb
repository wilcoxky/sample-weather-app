# frozen_string_literal: true

module OpenWeather
  class Cache
    class << self
      def clear_expired_cache
        CacheWeather.where("created_at < ? ", Time.now - OpenWeather::CACHE_EXPIRATION_TIME).delete_all
      end
    end
  end
end
