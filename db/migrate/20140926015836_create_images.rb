class CreateImages < ActiveRecord::Migration
  def change
    create_table :images do |t|
      t.string :file_picker_url, null: false
      t.string :car_listing_id, null: false, index: true

      t.timestamps
    end
  end
end
