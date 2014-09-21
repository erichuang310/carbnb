class HomeController < ApplicationController
  def root
    @user = User.new
  end
end
