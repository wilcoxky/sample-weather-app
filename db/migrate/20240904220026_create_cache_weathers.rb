# frozen_string_literal: true

class CreateCacheWeathers < ActiveRecord::Migration[7.2]
  def change
    create_table(:cache_weathers) do |t|
      t.timestamps
      t.json(:data)
      t.string(:query)
      t.float(:latitude)
      t.float(:longitude)
      t.string(:zip_code)
    end
  end
end
