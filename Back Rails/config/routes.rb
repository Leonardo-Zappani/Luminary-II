Rails.application.routes.draw do
  resources :artifacts
  resources :actions
  resources :items
  resources :users
  post 'authenticate', to: 'authentication#authenticate'
end
