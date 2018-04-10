class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  def not_found
		render file: "public/404.html", status: :not_found
  end

  rescue_from CanCan::AccessDenied do |exception|
    redirect_to root_path
    flash[:danger] = "You not permission"
  end
end
