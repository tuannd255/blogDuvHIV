class User < ApplicationRecord

  has_secure_password

  has_many :posts, dependent: :destroy, foreign_key: :author_id
  has_many :claps, dependent: :destroy
  has_many :comments, dependent: :destroy
  has_many :categories
  before_save :downcase_email

  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  validates :email, presence: true, length: {maximum: 255},
    format: {with: VALID_EMAIL_REGEX}, uniqueness: {case_sensitive: false}

  before_save :downcase_email

  def downcase_email
    self.email = self.email.delete(' ').downcase
  end
end
