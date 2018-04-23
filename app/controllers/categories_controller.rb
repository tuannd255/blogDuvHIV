class CategoriesController < ApplicationController
  load_and_authorize_resource
  skip_authorize_resource only: %i(index show)
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
    unless @category
      redirect_to root_path
      flash[:danger] = t "not_found.category"
    end
  end
end
