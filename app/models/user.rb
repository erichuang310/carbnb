# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  email           :string(255)      not null
#  password_digest :string(255)      not null
#  session_token   :string(255)      not null
#  first_name      :string(255)      not null
#  last_name       :string(255)      not null
#  created_at      :datetime
#  updated_at      :datetime
#

class User < ActiveRecord::Base
  attr_reader :password

  validates :email,
            presence: true,
            uniqueness: true

  validates :password,
            confirmation: { value: true, message: "does not match" },
            length: { minimum: 6, allow_nil: true, message: "is too short (minimum 6)" }

  validates :password_digest,
            presence: true

  validates :session_token,
            presence: true,
            uniqueness: true

  validates :first_name,
            :last_name,
            presence: true

  after_initialize :ensure_session_token

  before_save do |user|
    user.first_name.downcase!
    user.last_name.downcase!
    user.email.downcase!
  end

  # Associations

  has_many(
    :requests,
    class_name: "Request",
    foreign_key: :leasee_id,
    primary_key: :id
  )

  has_many(
    :car_listings,
    class_name: "CarListing",
    foreign_key: :leaser_id,
    primary_key: :id
  )

  #

  def name
    "#{ first_name } #{ last_name }".titleize
  end

  def owns_car_listing?(car_listing)
    self.id == car_listing.leaser_id
  end
  
  # Login

  def self.find_by_credentials(email, password)
    user = User.find_by_email(email)
    user && user.is_password?(password) ? user : nil
  end

  def self.generate_session_token
    SecureRandom.urlsafe_base64(16)
  end

  # Password

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  # Session Token

  def reset_session_token!
    self.session_token = self.class.generate_session_token
    self.save!
    self.session_token
  end

  def ensure_session_token
    self.session_token ||= self.class.generate_session_token
  end
end
