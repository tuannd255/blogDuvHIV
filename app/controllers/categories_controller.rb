class CategoriesController < ApplicationController
	before_action :find_category, only: %i(show)

	def index
		@categories = Category.all
	end

	def new
		@category = current_user.categories.new
	end

	def create
		@category = current_user.categories.build category_params
		if @category.save
			redirect_to categories_path
			flash[:success] = t ".success"
		else
			render :new
			flash[:danger] = t ".failure"
		end
	end

	def show
		@posts = @category.posts
	end

	private

	def category_params
		params.require(:category).permit :image_category, :name, :description
	end

	def find_category
		@category = Category.find_by id: params[:id]
	end
end
