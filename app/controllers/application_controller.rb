class ApplicationController < ActionController::Base

  protect_from_forgery with: :exception

  def root
    if request.format == :html || request.format.class == Mime::NullType
      render layout: "application", html: ""
    else
      logger.error "Invalid request: #{request.path}"
      render status: 404, layout: false, content_type: "text/html"
    end
  end

  def routing_error
    raise ActionController::RoutingError, params[:path]
  end
end
