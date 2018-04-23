class PagesController < ApplicationController
 	def show
    @posts = if params[:page].eql? "life_story"
      Post.life_story.page(params[:page]).per Settings.per_page
    elsif params[:page].eql? "cooperate"
      Post.cooperate.page(params[:page]).per Settings.per_page
    else
      []
    end
    @popular_posts = Post.populars
    @tags = Tag.all
    if valid_page?
      render template: "pages/#{params[:page]}"
    else
      render file: "public/404.html", status: :not_found
    end
  end

  def home
  end

  def about
  end

  def life_story

  end

  def cooperate
  end

  private
  def valid_page?
    File.exist?(Pathname.new(Rails.root + "app/views/pages/#{params[:page]}.html.erb"))
	end
end
