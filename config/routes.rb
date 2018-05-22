Rails.application.routes.draw do
  root "posts#index"
  get "/pages/*page" => "pages#show"

  resources :posts
  # do
  #   resources :claps
  # end
  resources :categories
  # resources :comments, only: %i(create edit update destroy)
  resources :tags
  get "/comments/new/(:post_id)/(:parent_id)", to: "comments#new", as: :new_comment

  # devise_for :users, controllers: {
  #   sessions: "api/v1/sessions"
  # }

  namespace :api, {format: "json"} do
    namespace :v1 do
      post "sign_in", to: "sessions#create"
      delete "sign_out", to: "sessions#destroy"
      resources :users
      resources :posts
      match "*not_found", to: "base#routing_error", via: [:get, :post, :patch, :put, :delete]
    end
  end
  get "*path", to: "application#root"
  get "*not_found", to: "application#routing_error"
end
