class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
    :recoverable, :rememberable, :trackable, :validatable

  has_many :posts, dependent: :destroy, foreign_key: :author_id
  has_many :claps, dependent: :destroy
  has_many :comments, dependent: :destroy
  has_many :categories
end
