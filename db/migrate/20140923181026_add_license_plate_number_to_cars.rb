class AddLicensePlateNumberToCars < ActiveRecord::Migration
  def change
    add_column :cars, :license_plate_number, :string, null: false
  end
end
