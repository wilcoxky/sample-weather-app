# frozen_string_literal: true

require "test_helper"

class CacheWeatherClearJobTest < ActiveJob::TestCase
  test "clears expired cache entries" do
    # Create expired cache entries
    CacheWeather.create(query: "London", data: "{}", created_at: 1.hour.ago)
    CacheWeather.create(query: "Paris", data: "{}", created_at: 2.hours.ago)

    # Create a valid cache entry
    CacheWeather.create(query: "New York", data: "{}")

    assert_difference "CacheWeather.count", -2 do
      CacheWeatherClearJob.perform_now
    end

    assert_not CacheWeather.exists?(query: "London")
    assert_not CacheWeather.exists?(query: "Paris")
    assert CacheWeather.exists?(query: "New York")
  end

  test "does not clear valid cache entries" do
    CacheWeather.create(query: "Tokyo", data: "{}")

    assert_no_difference "CacheWeather.count" do
      CacheWeatherClearJob.perform_now
    end

    assert CacheWeather.exists?(query: "Tokyo")
  end

  test "handles empty cache" do
    CacheWeather.delete_all

    assert_no_difference "CacheWeather.count" do
      CacheWeatherClearJob.perform_now
    end
  end
end
