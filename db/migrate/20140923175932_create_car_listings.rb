class CreateCarListings < ActiveRecord::Migration
  def change
    create_table :car_listings do |t|
      t.integer :leaser_id, null: false, index: true
      t.text :description, null: false
      t.string :title, null: false
      t.integer :price, null: false
      t.integer :deposit, null: false
      t.text :rules, null: false
      t.string :cancellation, null: false
      t.boolean :active, null: false, default: true

      t.timestamps
    end
  end
end
