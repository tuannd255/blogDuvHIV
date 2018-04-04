Rails.application.routes.draw do
  devise_for :users

  root "posts#index"
  get "/pages/*page" => "pages#show"

  resources :posts
  resources :comments, except: :new
  get "/comments/new/(:post_id)/(:parent_id)", to: "comments#new", as: :new_comment
end
