class ApplicationController < ActionController::API
  
  def authenticate_user
    authorization_header = request.headers[:Authorization]
    unless authorization_header
      return render_unauthorized("ログインが必要です。")
    end

    token = authorization_header.split(" ")[1]
    secret_key = Rails.application.credentials.secret_key_base

    begin
      decoded_code = JWT.decode(token, secret_key)
      @current_user = User.find(decoded_code[0]["user_id"])
    
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

  def render_unauthorized(message)
    render json: { error: message }, status: :unauthorized
  end
end
