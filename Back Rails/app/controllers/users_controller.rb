class UsersController < ApplicationController
  before_action :set_user, only: %i[show update destroy]

  # GET /users
  def index
    users = User.all
    render json: users
  end

  # GET /users/1
  def show
    render json: @user
  end

  # POST /users
  def create
    @user = User.new(user_params)

    if @user.save
      authenticate_and_render(@user)
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /users/1
  def update
    if @user.update(user_params)
      render json: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # DELETE /users/1
  def destroy
    @user.destroy!
  end

  private

  def set_user
    @user = User.find(params[:id])
  end

  def user_params
    params.permit(:email, :password, :name)
  end

  def authenticate_and_render(user)
    sleep 0.1
    command = AuthenticateUser.call(user.email, user.password)

    if command.success?
      render json: { auth_token: command.result, user_id: user.id }
    else
      render json: { error: 'Authentication failed' }, status: :unauthorized
    end
  end
end
