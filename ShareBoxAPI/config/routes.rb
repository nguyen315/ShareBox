Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :users do
        get '/voucher_requests', to: 'voucher_requests#fetch_voucher_requests_by_user'
      end
      resources :vouchers
      resources :voucher_requests

      post '/auth/login', to: 'auth#login'
      get '/auth/persist', to: 'auth#persist'
      get '/a*', to: 'application#not_found'
    end
  end
end
