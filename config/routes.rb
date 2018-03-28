Rails.application.routes.draw do
  devise_for :users

  root "posts#index"
  get "/pages/*page" => "pages#show"

  resources :posts
end
