class PostsController < ApplicationController
	before_action :find_post, only: %i(edit update destroy show)

	def index
		@posts = Post.all.page(params[:page]).per 10
		@popular_posts = Post.all
	end

	def new
		@post = current_user.posts.new
	end

	def create
		@post = current_user.posts.build post_params
		@post.save
	end

	def show
		@recent_posts = Post.take(3)
		@comments = Comment.where(post_id: @post.id).hash_tree(limit_depth: 5)
		@popular_posts = Post.all
		@comment = @post.comments.new
	end

	def edit
	end

	def update
		@post.update_attributes post_params
	end

	def destroy
		@post.destroy
	end

	private

	def post_params
		params.require(:post).permit :image_post, :title, :content
	end

	def find_post
		@post = Post.find_by id: params[:id]
	end
end
