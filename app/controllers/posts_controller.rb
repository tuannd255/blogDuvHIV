class PostsController < ApplicationController
	load_and_authorize_resource
	skip_authorize_resource only: %i(index show)
	before_action :find_post, only: %i(edit update destroy show)
	before_action :find_category, only: %i(create update)

	def index
		@posts = Post.all.page(params[:page]).per Settings.per_page
		@popular_posts = Post.populars
		@tags = Tag.all
	end

	def new
		@categories = Category.all
		@post = current_user.posts.new
	end

	def create
		@categories = Category.all
		@post = current_user.posts.build post_params
		if @post.save
			redirect_to posts_path
			flash[:success] = t ".success"
		else
			render :new
			flash[:danger] = t ".failure"
		end
	end

	def show
		@recent_posts = Post.normal.random (@post.id)
		@comments = Comment.where(post_id: @post.id).hash_tree(limit_depth: Settings.limit_deep)
		@popular_posts = Post.populars
		@comment = @post.comments.new
		@clap = @post.claps.find_or_initialize_by post_id: @post.id, user_id: current_user.try(:id)
	end

	def edit
	end

	def update
		if @post.update_attributes post_params
			redirect_to @post
			flash[:success] = t ".success"
		else
			render :edit
			flash[:danger] = t ".failure"
		end
	end

	def destroy
		if @post.destroy
			redirect_to posts_path
			flash[:success] = t ".success"
		else
			redirect_to @post
			flash[:success] = t ".failure"
		end
	end

	private

	def post_params
		params.require(:post).permit :image_post, :title, :content, :category_id, :tag_list, :type
	end

	def find_post
		@post = Post.find_by id: params[:id]
		unless @post
			redirect_to root_path
			flash[:danger] = t "not_found.category"
		end
	end

	def find_category
		@category = Category.find_by id: post_params[:category_id] if post_params[:category_id].present?
		unless @category
			redirect_to root_path
			flash[:danger] = t "not_found.category"
		end
	end
end
