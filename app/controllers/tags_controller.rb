class TagsController < ApplicationController
  def show
    @tag = Tag.find_by id: params[:id]
    @posts = Post.tagged_with(@tag.name)
  end
end
