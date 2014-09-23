class CreateCars < ActiveRecord::Migration
  def change
    create_table :cars do |t|
      t.integer :year, null: false
      t.string :make, null: false
      t.string :nameplate, null: false
      t.string :trim
      t.string :color, null: false
      t.integer :car_listing_id, null: false, index: true

      t.timestamps
    end
  end
end
