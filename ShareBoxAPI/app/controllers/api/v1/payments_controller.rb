class Api::V1::PaymentsController < Api::V1::AuthController
  before_action :authorized

  def index
    @payments = Payment.all.order(created_at: :desc)
    render json: { payments: @payments }
  end

  # POST create payment
  def create
    @payment = Payment.create(payment_params)
    if @payment.valid?
      render json: { payment: @payment }
    else
      render error: { error: 'Unable to create payment' }, status: 400
    end
  end

  private

  def payment_params
    params.require(:payment).permit(:method, :account_number).merge(user_id: @user[:id])
  end
end
