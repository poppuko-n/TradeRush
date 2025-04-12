class ApplicationController < ActionController::API
  
  def authenticate_user(password)
    authorization_header = require.headers[:Authorization]
    unless authorization_header
      return render_unauthorized("ログインが必要です。")
    end

    token = authorization_header
    secret_key = Rails.application.credentials.secret_key_base

    begin
      decoded_code = JWT.encode(token, secret_key)
      @current_user = User.find(decoded_code[0]["user_id"])
    rescue
      ActiveRecord::RecordNotFound
      render_unauthorized("ユーザーが見つかりません。")
    rescue JWT::DecodeError => e
      render_unauthorized("#{e.message}")
    end
  end

  def create_token(user_id)
    payload = { user_id: user_id }
    secret_key = Rails.application.credentials.secret_key_base
    token = JWT.encode(payload, secret_key)
    token
  end
end
