Rails.application.routes.draw do

  namespace :api do
    namespace :v1 do
      resources :users do
        resources :vouchers
        resources :voucher_requests
      end
      resources :vouchers
      resources :voucher_requests

      post '/auth/login', to: 'auth#login'
      get '/auth/persist', to: 'auth#persist'
      get '/a*', to: 'application#not_found'
    end
  end

end
