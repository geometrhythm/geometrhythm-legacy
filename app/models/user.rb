class User < ActiveRecord::Base
  validates :email, :session_token, presence: true
  validates :password_digest, presence: { message: "Password can't be blank"}
  validates :email, :password_digest, :session_token, uniqueness: true
  validates :password, length: { minimum: 6, allow_nil: true }

  attr_reader :password

  after_initialize :ensure_session_token

  has_many :rhythms, foreign_key: :creator_id

  has_many :rhythm_likings, class_name: 'Like', foreign_key: :liker_id
  has_many :liked_rhythms, through: :rhythm_likings, source: :rhythm

  has_many :namings, foreign_key: :namer_id
  has_many :rhythms_named, through: :namings, source: :rhythm
  has_many :names_named, through: :namings, source: :name

  has_many :comments

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(password_digest).is_password?(password)
  end

  def self.generate_session_token
    SecureRandom.urlsafe_base64
  end

  def ensure_session_token
    self.session_token ||= self.class.generate_session_token
  end

  def reset_session_token!
    self.session_token = self.class.generate_session_token
    self.save!
    self.session_token
  end

  def self.find_by_credentials(email, password)
    @user = User.find_by(email: email)
    return nil if @user.nil?
    @user.is_password?(password) ? @user : nil
  end
end
