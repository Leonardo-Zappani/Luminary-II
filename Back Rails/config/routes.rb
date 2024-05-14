Rails.application.routes.draw do
  resources :artifacts
  resources :actions
  resources :items
  post 'authenticate', to: 'authentication#authenticate'
end
