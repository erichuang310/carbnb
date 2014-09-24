module Api
  class SessionsController < ApiController
    def create
      @user = User.find_by_credentials(
        session_params[:email],
        session_params[:password]
      )

      if @user
        login!(@user)
        render json: @user, status: :ok
      else
        flash.now[:error] = ["Invalid login credentials. Please try again."]
        render json:
          { message: "Invalid login credentials. Please try again." },
          status: :unprocessable_entity
      end
    end

    def destroy
      logout!
      render json: {}
    end

    private
    def session_params
      params.require(:user).permit(:email, :password)
    end
  end
end
