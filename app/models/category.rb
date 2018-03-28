class Category < ApplicationRecord
	has_one :post, dependent: :destroy
end
