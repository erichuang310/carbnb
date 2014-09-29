# == Schema Information
#
# Table name: requests
#
#  id             :integer          not null, primary key
#  start_date     :date             not null
#  end_date       :date             not null
#  car_listing_id :integer          not null
#  leasee_id      :integer          not null
#  status         :string(255)      default("PENDING"), not null
#  created_at     :datetime
#  updated_at     :datetime
#

require 'test_helper'

class RequestTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
