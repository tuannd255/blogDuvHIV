class CommentsController < ApplicationController
  load_and_authorize_resource
  before_action :find_comment, only: %i(edit update)
  before_action :find_post, only: %i(create update)

  def new
    @parent = Comment.find_by id: params[:parent_id]
    @comment = Comment.new(parent_id: params[:parent_id])
    comments params[:post_id]
  end

  def create
    if comment_params[:parent_id].present?
      parent = Comment.find_by id: params[:comment].delete(:parent_id)
      @comment = parent.children.build comment_params if parent
    else
      @comment = current_user.comments.build comment_params.except(:parent_id)
    end

    if @comment && @comment.save
      comments comment_params[:post_id]
      respond_to do |f|
        f.js
        f.html
      end
    else
      redirect_to @post
      flash[:warning] = t ".failure"
    end
  end

  def edit
    @post = @comment.post
    @parent = @comment.parent
    comments @comment.post.id
  end

  def update
    if @comment.update_attributes comment_params
      comments comment_params[:post_id]
      respond_to do |f|
        f.js
        f.html
      end
    else
      redirect_to @post
      flash[:warning] = t ".failure"
    end
  end

  def destroy
    if @comment.destroy
      comments @comment.post.id
      respond_to do |f|
        f.js
        f.html
      end
    else
      redirect_to @post
      flash[:warning] = t ".failure"
    end
  end

  private
  def comment_params
    params.require(:comment).permit :parent_id, :user_id, :post_id, :content
  end

  def find_comment
    @comment = Comment.find_by id: params[:id]
    unless @comment
      redirect_to root_path
      flash[:danger] = t "not_found.comment"
    end
  end

  def find_post
    @post = Post.find_by id: comment_params[:post_id]
    unless @post
      redirect_to root_path
      flash[:danger] = t "not_found.post"
    end
  end

  def comments post_id
    @comments = Comment.where(post_id: post_id).hash_tree(limit_depth: 5)
  end
end
