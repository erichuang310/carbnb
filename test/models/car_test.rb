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

require 'test_helper'

class CarTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
