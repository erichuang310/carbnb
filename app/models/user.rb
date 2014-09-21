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

  validates :first_name, :last_name, presence: true

  after_initialize :ensure_session_token

  before_save do |user|
    user.first_name.downcase!
    user.last_name.downcase!
    user.email.downcase!
  end

  #

  def name
    "#{ first_name } #{ last_name }".titleize
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
