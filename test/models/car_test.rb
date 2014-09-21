# == Schema Information
#
# Table name: cars
#
#  id         :integer          not null, primary key
#  year       :integer          not null
#  make       :string(255)      not null
#  model      :string(255)      not null
#  trim       :string(255)
#  created_at :datetime
#  updated_at :datetime
#

require 'test_helper'

class CarTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
