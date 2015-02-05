Rails.application.routes.draw do
  root to: "root#root"

  namespace :api, defaults: { format: :json } do
    resources :rhythms, only: [:index, :show, :create, :update]
    resources :likes, only: [:show, :create, :destroy, :index]
    resources :names, only: [:show, :create, :destroy, :index]
    resources :namings, only: [:show, :create, :destroy, :index]
    resources :users, only: [:index, :show]
  end

  resources :users, only: [:new, :create]
  resource :session, only: [:new, :create, :destroy]
end
