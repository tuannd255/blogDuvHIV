class Post < ApplicationRecord
  extend FriendlyId

  acts_as_taggable
  friendly_id :title, use: :slugged

	mount_uploader :image_post, ImageUploader

  enum type_post: {normal: 0, life_story: 1, cooperate: 2}

	has_many :claps, dependent: :destroy
	has_many :comments, dependent: :destroy

	belongs_to :category, optional: true
	belongs_to :author, foreign_key: :author_id, class_name: "User", optional: true

  scope :tagged_with, -> (name) {
    joins(:tags).where("tags.name LIKE ?", name)
  }

  scope :populars, -> {
    joins(:claps).where("claps.number_tap > -1").group("posts.id").take Settings.take_post
  }

  scope :random, -> (id) {
    where.not(id: id).sample Settings.random
  }

  validates :title, presence: true, length: {minimum: 10, maximum: 1000}
  validates :content, presence: true, length: {minimum: 1}

  def number_claps
    claps.sum(:number_tap)
  end
end
