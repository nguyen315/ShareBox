class Api::V1::UsersController < Api::V1::ApplicationController
  # GET /users
  def index
    @users = User.all
    render json: @users
  end

  # GET /users/:id
  def show
    @user = User.find(params[:id])
    render json: @user
  end

  # POST /users
  def create
    @user = User.create(user_params)
    if @user.valid?
      token = encode_token({ user_id: @user.id })
      render json: { user: @user, token: token }
    else
      render error: { error: 'Unable to create user' }, status: :bad_request
    end
  end

  private

  def user_params
    params.permit(:username, :password)
  end
end
