class UsersController < ApplicationController
  before_action :authenticate_user, {only: [:action]}

  def create
    user = User.new(user_params)
    user.capital = 2_000_000
    if user.save
      render json:{ 
        token: create_token(user.id),
        capital: user.capital,
        status: :created}
    else
      render json: {
        user: user,
        errors: user.errors.full_messages
      },
      status: :unprocessable_entity
    end
  end

  def login
    user = User.find_by(name: params[:name])
    if user && user.authenticate(params[:password])
      render json: {token: create_token(user.id), status: :ok}
    else
      render json: {
        user: user,
        errors: "名前またはパスワードが違います。",
        status: :unauthorized
      }
    end
  end

  def action
    render json: {
      capital: @current_user.capital
    }, status: :ok
  end
  
  private

  def user_params
    params.require(:user).permit(:name, :password, :password_confirmation)
  end
end
