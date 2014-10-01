Rails.application.routes.draw do

  root "home#root"
  resource :home, only: :root

  namespace :api, defaults: { format: :json } do
    resources :car_listings, only: [:create, :update, :show, :index, :destroy] do
      # resources :requests, only: [:create] do
        # post "approve", on: :member
        # post "deny", on: :member
      # end
    end
    resources :requests, only: [:create, :index, :update]
    resources :users, only: [:new, :create]
    resource :session, only: [:new, :create, :destroy]
  end

end
