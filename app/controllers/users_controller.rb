class UsersController < ApplicationController
  before_action :only_logged_out!, only: [:new]

  # def index
  #   @user = User.all.includes(:rhythms).includes(:liked_rhythms)
  # end

  def new
    @user = User.new
  end

  # def show
  #   @user = User.find(params[:id]).includes(:rhythms).includes(:liked_rhythms)
  # end

  def create
    @user = User.new(user_params)
    if @user.save
      login!(@user)
      redirect_to root_url
    else
      flash.now[:notices] = @user.errors.full_messages
      render :new
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :password)
  end
end
