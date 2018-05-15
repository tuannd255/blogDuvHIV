class Category < ApplicationRecord
  extend FriendlyId

  friendly_id :name, use: :slugged
	mount_uploader :image_category, ImageUploader

	has_many :posts, dependent: :destroy

	belongs_to :user, optional: true

	validates :name, presence: true, length: {minimum: 1, maximum: 100}
	validates :description, presence: true, length: {minimum: 3, maximum: 100}
end
