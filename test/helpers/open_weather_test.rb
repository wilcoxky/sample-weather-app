# frozen_string_literal: true

require "test_helper"
require "webmock/minitest"

class OpenWeatherTest < ActiveSupport::TestCase
  setup do
    WebMock.disable_net_connect!(allow_localhost: true)
    Geocoder.configure(lookup: :test)
    Geocoder::Lookup::Test.add_stub("London", [
      {
        "address_components" =>
                [
                  { "long_name" => "London", "short_name" => "London", "types" => ["locality", "political"] },
                  { "long_name" => "London", "short_name" => "London", "types" => ["postal_town"] },
                  {
                    "long_name" => "Greater London",
                    "short_name" => "Greater London",
                    "types" => ["administrative_area_level_2", "political"],
                  },
                  {
                    "long_name" => "England",
                    "short_name" => "England",
                    "types" => ["administrative_area_level_1", "political"],
                  },
                  { "long_name" => "United Kingdom", "short_name" => "GB", "types" => ["country", "political"] },
                ],
        "formatted_address" => "London, UK",
        "geometry" =>
        {
          "bounds" =>
                    {
                      "northeast" => { "lat" => 51.6723432, "lng" => 0.148271 },
                      "southwest" => { "lat" => 51.38494009999999, "lng" => -0.3514683 },
                    },
          "location" => { "lat" => 51.5072178, "lng" => -0.1275862 },
          "location_type" => "APPROXIMATE",
          "viewport" =>
          {
            "northeast" => { "lat" => 51.6723432, "lng" => 0.148271 },
            "southwest" => { "lat" => 51.38494009999999, "lng" => -0.3514683 },
          },
        },
        "place_id" => "ChIJdd4hrwug2EcRmSrV3Vo6llI",
        "types" => ["locality", "political"],
      },
    ])
    Geocoder::Lookup::Test.add_stub("Paris", [
      {
        "address_components" =>
                [
                  { "long_name" => "Paris", "short_name" => "Paris", "types" => ["locality", "political"] },
                  { "long_name" => "Paris", "short_name" => "Paris", "types" => ["postal_town"] },
                  {
                    "long_name" => "Paris",
                    "short_name" => "Paris",
                    "types" => ["administrative_area_level_2", "political"],
                  },
                  {
                    "long_name" => "Ile-de-France",
                    "short_name" => "Ile-de-France",
                    "types" => ["administrative_area_level_1", "political"],
                  },
                  { "long_name" => "France", "short_name" => "FR", "types" => ["country", "political"] },
                ],
        "formatted_address" => "Paris, France",
        "geometry" =>
        {
          "bounds" =>
                    {
                      "northeast" => { "lat" => 2.412299, "lng" => 48.864716 },
                      "southwest" => { "lat" => 2.227024, "lng" => 48.716577 },
                    },
          "location" => { "lat" => 48.856614, "lng" => 2.3522219 },
          "location_type" => "APPROXIMATE",
          "viewport" =>
          {
            "northeast" => { "lat" => 2.412299, "lng" => 48.864716 },
            "southwest" => { "lat" => 2.227024, "lng" => 48.716577 },
          },
        },
        "place_id" => "ChIJdd4hrwug2EcRmSrV3Vo6llI",
        "types" => ["locality", "political"],
      },
    ])
    Geocoder::Lookup::Test.add_stub("invalid address", [])
    Geocoder::Lookup::Test.add_stub("2401 W Azeele St, Tampa, FL 33609", [
      {
        "address_components" =>
          [
            { "long_name" => "2401", "short_name" => "2401", "types" => ["street_number"] },
            { "long_name" => "West Azeele Street", "short_name" => "W Azeele St", "types" => ["route"] },
            { "long_name" => "Hyde Park", "short_name" => "Hyde Park", "types" => ["neighborhood", "political"] },
            { "long_name" => "Tampa", "short_name" => "Tampa", "types" => ["locality", "political"] },
            {
              "long_name" => "Hillsborough County",
              "short_name" => "Hillsborough County",
              "types" => ["administrative_area_level_2", "political"],
            },
            {
              "long_name" => "Florida",
              "short_name" => "FL",
              "types" => ["administrative_area_level_1", "political"],
            },
            { "long_name" => "United States", "short_name" => "US", "types" => ["country", "political"] },
            { "long_name" => "33609", "short_name" => "33609", "types" => ["postal_code"] },
            { "long_name" => "3317", "short_name" => "3317", "types" => ["postal_code_suffix"] },
          ],
        "formatted_address" => "2401 W Azeele St, Tampa, FL 33609, USA",
        "geometry" =>
  {
    "bounds" =>
        {
          "northeast" => { "lat" => 27.941836, "lng" => -82.4842611 },
          "southwest" => { "lat" => 27.9411657, "lng" => -82.4849575 },
        },
    "location" => { "lat" => 27.9414722, "lng" => -82.484478 },
    "location_type" => "ROOFTOP",
    "viewport" =>
    {
      "northeast" => { "lat" => 27.94281563029151, "lng" => -82.48326031970849 },
      "southwest" => { "lat" => 27.9401176697085, "lng" => -82.4859582802915 },
    },
  },
        "place_id" => "ChIJl-UoOGXDwogR1lE_qnFzt-w",
        "types" => ["premise"],
      },
    ])

    stub_request(
      :get,
      "#{OpenWeather::OPEN_WEATHER_URL}?lat=51.5072178&lon=-0.1275862&appid=#{OpenWeather::OPEN_WEATHER_API_KEY}",
    ).to_return(
      status: 200,
      body: {
        "coord" => { "lon" => -0.1275862, "lat" => 51.5072178 },
        "weather" => [
          { "id" => 800, "main" => "Clear", "description" => "clear sky", "icon" => "01d" },
        ],
        "base" => "stations",
        "main" => {
          "temp" => 282.55,
          "feels_like" => 281.86,
          "temp_min" => 280.37,
          "temp_max" => 284.26,
          "pressure" => 1023,
          "humidity" => 81,
        },
        "visibility" => 10000,
        "wind" => { "speed" => 4.12, "deg" => 330 },
        "cod" => 200,
      }.to_json,
      headers: { content_type: "application/json" },
    )

    stub_request(
      :get,
      "#{OpenWeather::OPEN_WEATHER_URL}?zip=33609,US&appid=#{OpenWeather::OPEN_WEATHER_API_KEY}",
    ).to_return(
      status: 200,
      body: {
        "coord" => { "lon" => -82.484478, "lat" => 27.9414722 },
        "weather" => [
          { "id" => 800, "main" => "Clear", "description" => "clear sky", "icon" => "01d" },
        ],
        "base" => "stations",
        "main" => {
          "temp" => 302.15,
          "feels_like" => 304.26,
          "temp_min" => 302.15,
          "temp_max" => 304.26,
          "pressure" => 1023,
          "humidity" => 81,
        },
        "visibility" => 10000,
        "wind" => { "speed" => 4.12, "deg" => 330 },
        "cod" => 200,
      }.to_json,
      headers: { content_type: "application/json" },
    )

    # Stub paris weather api error
    stub_request(
      :get,
      "#{OpenWeather::OPEN_WEATHER_URL}?lat=48.856614&lon=2.3522219&appid=#{OpenWeather::OPEN_WEATHER_API_KEY}",
    ).to_return(
      status: 500,
      body: "Internal Server Error",
    )
  end

  teardown do
    WebMock.allow_net_connect!
  end

  test "get_weather_by_address returns weather data for valid named location" do
    weather = OpenWeather::Client.get_weather_by_address("London")
    assert_equal(weather["coord"]["lon"], -0.1275862)
    assert_equal(weather["coord"]["lat"], 51.5072178)
  end

  test "get_weather_by_address returns weather data for valid full address" do
    weather = OpenWeather::Client.get_weather_by_address("2401 W Azeele St, Tampa, FL 33609")
    assert_equal(weather["coord"]["lon"], -82.484478)
    assert_equal(weather["coord"]["lat"], 27.9414722)
  end

  test "get_weather_by_address handles invalid address" do
    assert_raises(OpenWeather::Types::AddressLookupError) do
      OpenWeather::Client.get_weather_by_address("invalid address")
    end
  end

  test "get_weather_by_address handles API errors" do
    assert_raises(OpenWeather::Types::WeatherApiError) do
      OpenWeather::Client.get_weather_by_address("Paris")
    end
  end

  test "get_weather_by_address caches results of lat, lng searches" do
    OpenWeather::Client.get_weather_by_address("London")
    weather = OpenWeather::Client.get_weather_by_address("London")
    assert_equal(weather[:cache_hit], true)
  end

  test "get_weather_by_address caches results of zip code searches" do
    OpenWeather::Client.get_weather_by_address("2401 W Azeele St, Tampa, FL 33609")
    weather = OpenWeather::Client.get_weather_by_address("2401 W Azeele St, Tampa, FL 33609")
    assert_equal(weather[:cache_hit], true)
  end
end
