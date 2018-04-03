class CommentsController < ApplicationController
	def new
		@parent = Comment.find_by id: params[:parent_id]
    @comment = Comment.new(parent_id: params[:parent_id])
	end

	def create
		if comment_params[:parent_id].present?
			parent = Comment.find_by id: params[:comment].delete(:parent_id)
			@comment = parent.children.build comment_params if parent
		else
			@comment = current_user.comments.build comment_params.except(:parent_id)
		end
		@comment.save if @comment
	end

	private
	def comment_params
		params.require(:comment).permit :parent_id, :user_id, :post_id, :content
	end
end
