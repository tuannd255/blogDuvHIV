class Api::V1::BaseController < ApplicationController
  require "json_web_token"
  include ApplicationHelper

  attr_reader :current_user

  protect_from_forgery with: :null_session

  before_action :authenticate_request!

  skip_before_action :verify_authenticity_token

  def not_found
    render file: "public/404.html", status: :not_found
  end

  def routing_error
    raise ActionController::RoutingError, params[:not_found]
  end

  protected

  def authenticate_request!
    unless user_id_in_token? && JsonWebToken.valid_payload(decode_auth_token)
      render json: {errors: ["Not Authenticated"]}, status: :unauthorized
      return
    end
    user = User.find_by id: decode_auth_token[:user_id], auth_token: http_token
    render json: {errors: ["Token is invalid"]}, status: :unauthorized unless user.present?
    @current_user = user
    return
  rescue JWT::VerificationError, JWT::DecodeError
    render json: { errors: ["Not Authenticated"] }, status: :unauthorized
  end

  rescue_from ActiveRecord::RecordNotFound do |_e|
    render json: { error: t("api.errors.record_not_found") }.to_json, status: 404
  end

  rescue_from ActiveRecord::RecordInvalid do |_e|
    render json: { error: t("api.errors.record_invalid") }.to_json, status: 400
  end

  rescue_from ActiveRecord::RecordNotUnique do |_e|
    render json: { error: t("api.errors.record_not_unique") }.to_json, status: 400
  end

  rescue_from CanCan::AccessDenied do |e|
    redirect_to root_path
    flash[:danger] = "You not permission"
  end

  private
  def http_token
    @http_token ||= if request.headers["Authorization"].present?
      request.headers["Authorization"].split(" ").last
    end
  end

  def decode_auth_token
    @decode_auth_token ||= JsonWebToken.decode(http_token)
  end

  def user_id_in_token?
    http_token && decode_auth_token && decode_auth_token[:user_id].to_i
  end
end
