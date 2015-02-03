class SessionsController < ApplicationController
  def create
    @user = User.find_by_credentials(
      params[:user][:email],
      params[:user][:password]
    )

    if @user.nil?
      flash.now[:notices] = ["Invalid credentials."]
      render :new
    else
      login!(@user)
      redirect_to root # eventually need to fix
    end

  end

  def destroy
    logout!
    redirect_to new_session_url
  end
end
