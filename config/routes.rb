Rails.application.routes.draw do
  namespace :api do
    get 'movies/index'
    post 'movies/', to: 'movies#create'
    put 'movies/', to: 'movies#update'
    delete 'movies/:id', to: 'movies#destroy'
  end

  resources :movies

  match '*path' => redirect('/'), via: :get

  root 'seat#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
