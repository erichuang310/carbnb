class SessionsController < ApplicationController
  def new
    @user = User.new
  end

  def create
    @user = User.find_by_credentials(
      session_params[:email],
      session_params[:password]
    )

    if @user
      login!(@user)
      redirect_to root_url
    else
      @user = User.new(email: session_params[:email])
      flash.now[:error] = ["Failed to log in. Please try again."]
      render :new
    end
  end

  def destroy
    logout!
    redirect_to root_url
  end

  private
  def session_params
    params.require(:user).permit(:email, :password)
  end
end
