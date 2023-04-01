class Api::V1::VouchersController < Api::V1::AuthController
  before_action :authorized

  def index
    @vouchers = Voucher.all
    render json: {vouchers: @vouchers}
  end

  # POST /vouchers
  def create
    @voucher = Voucher.create(voucher_params)
    if @voucher.valid?
      render json: {voucher: @voucher}
    else
      render error: { error: 'Unable to create voucher' }, status: 400
    end
  end

  private

  def voucher_params
    params.permit(:code).merge(user_id: @user[:id])
  end
end
