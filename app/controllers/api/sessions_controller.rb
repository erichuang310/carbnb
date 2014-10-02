module Api
  class SessionsController < ApiController
    def create
      @user = User.find_by_credentials(
        session_params[:email],
        session_params[:password]
      )

      if @user
        login!(@user)
        render :show
      else
        render json: { message: "Invalid login credentials" }, status: :unprocessable_entity
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
