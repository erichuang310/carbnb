class AddUniqueIndexForCarListingIdAndLeaseeId < ActiveRecord::Migration
  def change
    add_index :requests, [:car_listing_id, :leasee_id], unique: true
  end
end
