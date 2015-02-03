class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  helper_method :current_user, :logged_in?

  def login!(user)
    session[:token] = user.reset_session_token!
  end

  def logout!
    current_user.try(:reset_session_token!)
    session[:token] = nil
  end

  def current_user
    @current_user ||= User.find_by(session_token: session[:token])
  end

  def logged_in?
    !!current_user
  end

  def require_logged_in!
    redirect_to new_session_url unless logged_in?
  end
end
