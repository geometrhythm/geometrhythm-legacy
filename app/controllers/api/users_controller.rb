module Api
  class UsersController < ApplicationController

    def index
      @users = User.all
      render :all
    end

    def show
      @user = User.find(params[:id])
      render :show
    end
  end
end
