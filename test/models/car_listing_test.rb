# == Schema Information
#
# Table name: car_listings
#
#  id           :integer          not null, primary key
#  leaser_id    :integer          not null
#  title        :string(255)      not null
#  description  :text             not null
#  rate         :integer          not null
#  deposit      :integer          not null
#  cancellation :string(255)      not null
#  active       :boolean          default(TRUE), not null
#  car_year     :integer          not null
#  car_make     :string(255)      not null
#  car_model    :string(255)      not null
#  car_color    :string(255)      not null
#  address      :string(255)      not null
#  latitude     :float            not null
#  longitude    :float            not null
#  created_at   :datetime
#  updated_at   :datetime
#

require 'test_helper'

class CarListingTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
