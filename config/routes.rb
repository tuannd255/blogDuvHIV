Rails.application.routes.draw do
  devise_for :users

  root "posts#index"
  get "/pages/*page" => "pages#show"

  resources :posts do
    resources :claps
    collection { post :import }
  end
  resources :categories
  resources :comments, except: :new
  resources :tags
  resources :imports
  get "/comments/new/(:post_id)/(:parent_id)", to: "comments#new", as: :new_comment
end
