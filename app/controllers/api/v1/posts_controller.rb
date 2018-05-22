class Api::V1::PostsController < Api::V1::BaseController
  skip_before_action :authenticate_request!, only: %i(index show)
  before_action :find_post, only: %i(show update)

  def index
    page = params[:page].to_i
    per_page = params[:page].to_i > 0 ? params[:per_page].to_i : Settings.per_page
    @posts = Post.all.page(page).per per_page
    data = @posts.map { |post| payload(post)  }
    render json: {
      total_posts: @posts.size,
      page: page,
      per_page: per_page,
      posts: data
    }, status: 200
  end

  def show
    render json: { post: payload(@post) }, status: 200
  end

  def create
    post = current_user.posts.build post_params
    if post.save
      render json: { post: payload(post) }, status: 200
    else
      head 400
    end
  end

  def update
    if @post.update_attributes post_params
      render json: { post: payload(@post) }, status: 200
    else
      head 400
    end
  end

  def destroy
    if @post.destroy
      head 200
    else
      head 400
    end
  end

  private

  def post_params
    params.require(:post).permit :title, :content, :author_id, :category_id, :image_post, :status, :type_post
  end

  def payload post
    postJSON = {
      id: post.id,
      image_url: post.image_post.url,
      title: post.title,
      content: post.content,
      slug: post.slug,
      created_at: post.created_at,
      updated_at: post.updated_at
    }
    author = post.author
    if author&.present?
      postJSON[:author] = {
        id: author.id,
        name: author.name,
        email: author.email,
        gender: author.gender
      }
    end
    category = post.category
    if category&.present?
      postJSON[:category] = {
        id: category.id,
        name: category.name
      }
    end
    postJSON
  end

  def find_post
    @post = Post.friendly.find params[:id]
    raise ActiveRecord::RecordNotFound unless @post
  end
end
