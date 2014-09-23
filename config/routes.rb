Rails.application.routes.draw do
  root "home#root"
  resource :home, only: [:root]
  resources :users, only: [:new, :create]
  resource :session, only: [:new, :create, :destroy]

  namespace :api, defaults: { format: :json } do
    resources :car_listings, only: [:create, :update, :show, :index, :destroy]
    resources :cars, only: [:create, :update, :destroy]
  end

end
