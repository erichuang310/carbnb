# == Schema Information
#
# Table name: requests
#
#  id             :integer          not null, primary key
#  start_date     :date             not null
#  end_date       :date             not null
#  car_listing_id :integer          not null
#  leasee_id      :integer          not null
#  status         :string(255)      default("Pending"), not null
#  created_at     :datetime
#  updated_at     :datetime
#

class Request < ActiveRecord::Base
  default_scope  { order(:start_date => :asc) }

  validates :start_date,
            :end_date,
            :car_listing,
            :leasee,
            :status,
            presence: true
  #

  validates :start_date,
            date: { after_or_equal_to: Proc.new { Time.now }, message: 'is in the past' }
  validates :end_date,
            date: { after_or_equal_to: :start_date, message: 'is before start date'  }

  validate :does_not_overlap_approved_request

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
    raise "not pending" unless self.status == "Pending"
    transaction do
      self.status = "Approved"
      self.save!

      overlapping_pending_requests.update_all(status: 'Denied')
    end
  end

  def deny!
    self.status = "Denied"
    self.save!
  end

  def approved?
    self.status == "Approved"
  end

  def denied?
    self.status == "Denied"
  end

  def pending?
    self.status == "Pending"
  end


  private

  def dates_in_future
    if start_date < Date.today || end_date < Date.today
      errors.add(:start_date, "can't be in the past")
    end
  end

  def start_date_before_end_date
    errors.add(:end_date, "must be after the start date") if start_date > end_date
  end

  def overlapping_requests
  Request.where("(:id IS NULL) OR (id != :id)", id: self.id)
  .where(car_listing_id: car_listing_id)
  .where(<<-SQL, start_date: start_date, end_date: end_date)
      ((start_date < :end_date) AND
      (end_date > :start_date))
    SQL
  end

  def overlapping_approved_requests
    overlapping_requests.where("status = 'Approved'")
  end

  def overlapping_pending_requests
    overlapping_requests.where("status = 'Pending'")
  end

  def does_not_overlap_approved_request
    return if self.denied?

    unless overlapping_approved_requests.empty?
      errors[:base] <<
        "Request conflicts with existing approved request"
    end
  end

end
