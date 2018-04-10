class Clap < ApplicationRecord
	belongs_to :post

  validates :number_tap,
  numericality: {only_integer: true, greater_than_or_equal_to: 0,
    less_than_or_equal_to: 200}
end
