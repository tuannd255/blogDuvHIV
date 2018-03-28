class PostsController < ApplicationController
	before_action :find_post, only: %i(edit update destroy)

	def new
		@post = current_user.posts.new
	end

	def create
		@post = current_user.posts.build post_params
		@post.save
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
