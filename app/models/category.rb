class Category < ApplicationRecord
	mount_uploader :image_category, ImageUploader

	has_many :posts, dependent: :destroy

	belongs_to :user
end
