class CreateRequests < ActiveRecord::Migration
  def change
    create_table :requests do |t|
      t.date :start_date, null: false
      t.date :end_date, null: false
      t.integer :car_listing_id, null: false, index: true
      t.integer :leasee_id, null: false, index: true

      t.timestamps
    end
  end
end
