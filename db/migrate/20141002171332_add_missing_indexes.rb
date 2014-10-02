class AddMissingIndexes < ActiveRecord::Migration
  def change
    add_index :images, :car_listing_id
    add_index :requests, :leasee_id
    add_index :requests, :car_listing_id
    add_index :car_listings, :leaser_id
  end
end
