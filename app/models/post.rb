class Post < ApplicationRecord
  acts_as_taggable

	mount_uploader :image_post, ImageUploader

	has_many :claps, dependent: :destroy
	has_many :comments, dependent: :destroy

	belongs_to :category, optional: true
	belongs_to :author, foreign_key: :author_id, class_name: "User", optional: true

  scope :tagged_with, -> (name) {
    joins(:tags).where("tags.name LIKE ?", name)
  }

  validates :title, presence: true, length: {minimum: 10, maximum: 1000}
  validates :content, presence: true, length: {minimum: 1}
end
