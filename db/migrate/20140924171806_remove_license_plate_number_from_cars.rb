class RemoveLicensePlateNumberFromCars < ActiveRecord::Migration
  def change
    remove_column :cars, :license_plate_number, :string
  end
end
