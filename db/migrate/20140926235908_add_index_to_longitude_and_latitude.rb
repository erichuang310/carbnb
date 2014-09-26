class AddIndexToLongitudeAndLatitude < ActiveRecord::Migration
  def change
    add_index :car_listings, :latitude
    add_index :car_listings, :longitude
  end
end
