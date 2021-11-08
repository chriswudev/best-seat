Rails.application.routes.draw do
  # get 'seat/index', to: 'hello_world#index'
  # get 'seat', to: 'hello_world#index'
  # get 'movies/index', to: 'hello_world#index'
  # get 'movies', to: 'seat#index'
  # get '404', to: 'seat#index'
  # resources :hello_world
  resources :movies

  match '*path' => redirect('/'), via: :get

  root 'seat#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
