Rails.application.routes.draw do
  root to: "root#root"

  namespace :api, defaults: { format: :json } do
    resources :rhythms, only: [:index, :show, :create]
  end

  resources :users, only: [:new, :create]
  resource :session, only: [:new, :create, :destroy]
end
