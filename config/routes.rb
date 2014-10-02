Rails.application.routes.draw do

  root "home#root"
  resource :home, only: :root

  namespace :api, defaults: { format: :json } do

    resources :car_listings, only: [:create, :update, :show, :index, :destroy]

    resources :requests, only: [:create, :index, :update]

    resources :users, only: [:new, :create] do
      resources :car_listings, only: [:index]
      resources :requests, only: [:index]
    end

    resource :session, only: [:new, :create, :destroy]
  end

end
