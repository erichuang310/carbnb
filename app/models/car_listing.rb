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

class CarListing < ActiveRecord::Base
  validates :leaser,
            :car,
            :description,
            :title,
            :price,
            :deposit,
            :rules,
            :cancellation,
            :active,
            presence: true

  belongs_to(
    :leaser,
    class_name: "User",
    foreign_key: :leaser_id,
    primary_key: :id
  )

  has_many(
    :requests,
    class_name: "Request",
    foreign_key: :car_listing_id,
    primary_key: :id
  )

  has_one(
    :car,
    class_name: "Car",
    foreign_key: :car_listing_id,
    primary_key: :id
  )
end
