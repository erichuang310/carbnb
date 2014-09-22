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
      render action: "create", status: :ok
    else
      flash.now[:error] = ["Invalid login credentials. Please try again."]
      render action: "create", status: :unprocessable_entity
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
