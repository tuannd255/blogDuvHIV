class Api::V1::SessionsController < Api::V1::BaseController
  skip_before_action :authenticate_request!, only: %i(create)

  def create
    user = User.find_by email: user_params[:email].to_s.downcase

    if user&.authenticate user_params[:password]
      auth_token = JsonWebToken.encode({user_id: user.id})
      user.update_attributes auth_token: auth_token
      render json: {
        auth_token: auth_token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          birth_day: user.birth_day,
          gender: user.gender
        }
      }, status: 200
    else
      render json: { status: 200 }
    end
  end

  def destroy
    if current_user.update_attributes auth_token: nil
      head 204
    else
      render json: {errors: ["logout failure"]}
    end
  end

  private

  def user_params
    params.require(:session).permit :email, :password, :password_confirmation
  end
end
