class CreateCars < ActiveRecord::Migration
  def change
    create_table :cars do |t|
      t.integer :year, null: false
      t.string :make, null: false
      t.string :model, null: false
      t.string :trim

      t.timestamps
    end
  end
end
