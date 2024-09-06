# frozen_string_literal: true

class AddCountryCodeToCacheWeather < ActiveRecord::Migration[7.2]
  def change
    add_column(:cache_weathers, :country_code, :string)
  end
end
