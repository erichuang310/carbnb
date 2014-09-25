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
#  created_at   :datetime
#  updated_at   :datetime
#

class CarListing < ActiveRecord::Base
  validates :leaser,
            :title,
            :description,
            :rate, numericality: { only_integer: true }
            :deposit, numericality: { only_integer: true }
            :cancellation,
            :active,
            :car_year, numericality: { only_integer: true }
            :car_make,
            :car_model,
            :car_color,
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
end
