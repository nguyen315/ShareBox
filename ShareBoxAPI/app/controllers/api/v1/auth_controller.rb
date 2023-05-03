class Api::V1::AuthController < Api::V1::ApplicationController
  before_action :authorized, only: [:persist]

  def login
    @user = User.find_by(username: params[:username])

    if @user && @user.authenticate(params[:password])
      token = encode_token({ user_id: @user.id })
      render json: { user: @user, token: token }
    else
      render json: { error: "Invalid username or password" }, status: :bad_request
    end
  end

  def persist
    render json: @user
  end

  def encode_token(payload)
    JWT.encode(payload, ENV["JWT_SECRET"])
  end

  def auth_header
    # { Authorization: 'Bearer <token>' }
    request.headers["Authorization"]
  end

  def decode_token
    if auth_header
      token = auth_header.split(" ").last
      begin
        JWT.decode(token, ENV["JWT_SECRET"], true, algorithm: "HS256")
      rescue JWT::DecodeError
        nil
      end
    end
  end

  def logged_in_user
    if decode_token
      user_id = decode_token[0]["user_id"]
      @user = User.find_by(id: user_id)
    end
  end

  def logged_in?
    !!logged_in_user
  end

  def authorized
    unless logged_in?
      render json: { message: "Please log in" }, status: :unauthorized
    end
  end
end
