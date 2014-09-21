Rails.application.routes.draw do
  root "home#root"
  resource :home, only: [:root]
  resources :users, only: [:new, :create]
  resource :session, only: [:new, :create, :destroy]
end