# == Schema Information
#
# Table name: requests
#
#  id             :integer          not null, primary key
#  start_date     :date             not null
#  end_date       :date             not null
#  car_listing_id :integer          not null
#  leasee_id      :integer          not null
#  created_at     :datetime
#  updated_at     :datetime
#

class Request < ActiveRecord::Base
  validates :start_date,
            :end_date,
            :car_listing,
            :leasee,
            presence: true
  validate  :start_date_in_future
  validate  :start_date_before_end_date
  validate  :leaser_is_not_leasee

  belongs_to(
    :leasee,
    class_name: "User",
    foreign_key: :leasee_id,
    primary_key: :id
  )

  belongs_to(
    :car_listing,
    class_name: "CarListing",
    foreign_key: :car_listing_id,
    primary_key: :id
  )

  private

  def start_date_in_future
    errors.add(:start_date, "can't be in the past") if start_date < Date.today
  end

  def start_date_before_end_date
    errors.add(:end_date, "must be after the start date") if start_date > end_date
  end

  def leaser_is_not_leasee
    errors.add(:leasee_id, "can't be the leaser") if leasee == car_listing.leaser
  end

end
