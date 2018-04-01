class Comment < ApplicationRecord
	has_closure_tree

	belongs_to :post
	belongs_to :user
end
