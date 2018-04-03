class CommentsController < ApplicationController
	def new
		@parent = Comment.find_by id: params[:parent_id]
    @comment = Comment.new(parent_id: params[:parent_id])
    @comments = Comment.where(post_id: params[:post_id]).hash_tree(limit_depth: 5)
	end

	def create
		if comment_params[:parent_id].present?
			parent = Comment.find_by id: params[:comment].delete(:parent_id)
			@comment = parent.children.build comment_params if parent
		else
			@comment = current_user.comments.build comment_params.except(:parent_id)
		end

		if @comment && @comment.save
			@comments = Comment.where(post_id: @comment.post.id).hash_tree(limit_depth: 5)
			respond_to do |f|
				f.js
				f.html
			end
		else

		end
	end

	private
	def comment_params
		params.require(:comment).permit :parent_id, :user_id, :post_id, :content
	end
end
