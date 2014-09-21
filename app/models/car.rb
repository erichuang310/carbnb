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

class Car < ActiveRecord::Base
  validates :year, :make, :model, presence: true
end
