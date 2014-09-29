# == Schema Information
#
# Table name: images
#
#  id              :integer          not null, primary key
#  file_picker_url :string(255)      not null
#  car_listing_id  :string(255)      not null
#  created_at      :datetime
#  updated_at      :datetime
#

require 'test_helper'

class ImageTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
