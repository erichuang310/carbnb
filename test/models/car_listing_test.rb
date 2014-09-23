# == Schema Information
#
# Table name: car_listings
#
#  id           :integer          not null, primary key
#  leaser_id    :integer          not null
#  description  :text             not null
#  title        :string(255)      not null
#  price        :integer          not null
#  deposit      :integer          not null
#  rules        :text             not null
#  cancellation :string(255)      not null
#  active       :boolean          default(TRUE), not null
#  created_at   :datetime
#  updated_at   :datetime
#

require 'test_helper'

class CarListingTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
