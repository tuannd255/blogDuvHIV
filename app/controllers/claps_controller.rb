class ClapsController < ApplicationController
  before_action :find_post, only: %i(create update)
  before_action :find_clap, only: %i(update)

  def create
    @clap = @post.claps.build
    @clap.user_id = current_user.id
    @clap.number_tap = params[:number_tap]
    @clap.save
    respond_to do |f|
      f.html
      f.js
      f.json {render json: @clap}
    end
  end

  def update
    number_tap = @clap.number_tap.to_i + params[:number_tap].to_i
    @clap.update_attributes number_tap: number_tap
    respond_to do |f|
      f.html
      f.js
      f.json {render json: @clap}
    end
  end

  private
  def clap_params
    params.require(:clap).permit :number_tap, :user_id
  end

  def find_post
    @post = Post.find_by id: params[:post_id]
  end

  def find_clap
    @clap = @post.claps.find_by id: params[:id]
  end
end
