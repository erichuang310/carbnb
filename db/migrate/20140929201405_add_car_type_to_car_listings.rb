class AddCarTypeToCarListings < ActiveRecord::Migration
  def change
    add_column :car_listings, :car_type, :string
  end
end
