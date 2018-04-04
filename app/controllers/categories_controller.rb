class CategoriesController < ApplicationController
	before_action :find_category, only: %i(show)

	def new
		@category = current_user.categories.new
	end

	def create
		@category = current_user.categories.build category_params
		@category.save
	end

	def show
		@posts = @category.posts
	end

	private

	def category_params
		params.require(:category).permit :image_category, :name
	end

	def find_category
		@category = Category.find_by id: params[:id]
	end
end
