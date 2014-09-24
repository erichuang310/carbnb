module Api
  class UsersController < ApiController
    def create
      @user = User.new(user_params)
      if @user.save
        login!(@user)
        render json: @user, status: :created
      else
        render json: @user.errors.full_messages, status: :unprocessable_entity
      end
    end

    private
    def user_params
      params.require(:user).permit(
        :email,
        :password,
        :password_confirmation,
        :first_name,
        :last_name
      )
    end

  end
end
