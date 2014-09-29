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

class Image < ActiveRecord::Base
  validates :file_picker_url, :car_listing, presence: true

  belongs_to(
    :car_listing,
    class_name: "CarListing",
    foreign_key: :car_listing_id,
    primary_key: :id
  )
end
