class Post < ApplicationRecord
	has_many :claps, dependent: :destroy
	has_many :comments, dependent: :destroy

	belongs_to :category, optional: true
	belongs_to :author, foreign_key: :author_id, class_name: "User", optional: true
end
