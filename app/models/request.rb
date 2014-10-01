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

class Request < ActiveRecord::Base
  validates :start_date,
            :end_date,
            :car_listing,
            :leasee,
            :status,
            presence: true
  #
  # validate  :start_date_in_future
  #
  # validate  :start_date_before_end_date

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

  def approve!
    raise "not pending" unless self.status == "PENDING"
    transaction do
      self.status = "APPROVED"
      self.save!

      overlapping_pending_requests.update_all(status: 'DENIED')
    end
  end

  def deny!
    self.status = "DENIED"
    self.save!
  end

  def approved?
    self.status == "APPROVED"
  end

  def denied?
    self.status == "DENIED"
  end

  def pending?
    self.status == "PENDING"
  end


  private

  def start_date_in_future
    errors.add(:start_date, "can't be in the past") if start_date < Date.today
  end

  def start_date_before_end_date
    errors.add(:end_date, "must be after the start date") if start_date > end_date
  end

  def overlapping_requests
  Request.where("(:id IS NULL) OR (id != :id)", id: self.id).where(car_listing_id: car_listing_id).where(
    <<-SQL,start_date: start_date, end_date: end_date)
      ((start_date < :end_date) OR
      (end_date > :start_date))
    SQL
  end

  def overlapping_approved_requests
    overlapping_requests.where("status = 'APPROVED'")
  end

  def overlapping_pending_requests
    overlapping_requests.where("status = 'PENDING'")
  end

  def does_not_overlap_approved_request
    return if self.denied?

    unless overlapping_approved_requests.empty?
      errors[:base] <<
        "Request conflicts with existing approved request"
    end
  end

end
