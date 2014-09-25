class CreateCarListings < ActiveRecord::Migration
  def change
    create_table :car_listings do |t|
      t.integer :leaser_id, null: false, index: true
      t.string :title, null: false
      t.text :description, null: false
      t.integer :rate, null: false
      t.integer :deposit, null: false
      t.string :cancellation, null: false
      t.boolean :active, null: false, default: true
      t.integer :car_year, null: false
      t.string :car_make, null: false
      t.string :car_model, null: false
      t.string :car_color, null: false

      t.timestamps
    end
  end
end
