# == Schema Information
#
# Table name: cars
#
#  id                   :integer          not null, primary key
#  year                 :integer          not null
#  make                 :string(255)      not null
#  nameplate            :string(255)      not null
#  trim                 :string(255)
#  color                :string(255)      not null
#  car_listing_id       :integer          not null
#  created_at           :datetime
#  updated_at           :datetime
#  license_plate_number :string(255)      not null
#

class Car < ActiveRecord::Base
  validates :year,
            :nameplate,
            :color,
            :car_listing,
            :nameplate,
            :license_plate_number,
            presence: true

  belongs_to(
    :car_listing,
    class_name: "CarListing",
    foreign_key: :car_listing_id,
    primary_key: :id
  )
end
