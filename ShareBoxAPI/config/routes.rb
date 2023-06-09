Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :users do
        get '/voucher_requests', to: 'voucher_requests#fetch_voucher_requests_by_user'
        resources :payments
      end
      resources :vouchers
      resources :voucher_requests do
        patch '/voucher', to: 'voucher_requests#submit_voucher'
      end

      post '/auth/login', to: 'auth#login'
      get '/auth/persist', to: 'auth#persist'
      get '/a*', to: 'application#not_found'
    end
  end
end
