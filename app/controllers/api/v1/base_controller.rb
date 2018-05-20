class Api::V1::BaseController < ApplicationController
  require "json_web_token"
  include ApplicationHelper

  attr_reader :current_user

  protect_from_forgery with: :null_session

  before_action :authenticate_request!

  def not_found
    render file: "public/404.html", status: :not_found
  end

  protected

  def authenticate_request!
    user = User.find_by id: decode_auth_token[:user_id], auth_token: http_token
    unless user_id_in_token? && JsonWebToken.valid_payload(decode_auth_token) && user.present?
      render json: {errors: ["Not Authenticated"]}, status: :unauthorized
      return
    end

    @current_user = user
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

  rescue_from CanCan::AccessDenied do |exception|
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
