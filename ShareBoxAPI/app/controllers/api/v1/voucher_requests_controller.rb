class Api::V1::VoucherRequestsController < Api::V1::AuthController
  before_action :authorized

  def index
    @voucher_requests = VoucherRequest.all
    render json: {voucher_requests: @voucher_requests}
  end

  # POST create voucher request
  def create
    @voucher_request = VoucherRequest.create(voucher_request_params)
    if @voucher_request.valid?
      render json: {voucher_request: @voucher_request}
    else
      render error: { error: 'Unable to create voucher request' }, status: 400
    end
  end

  def voucher_request_params
    puts "#>>>#{params}"
    params.require(:voucher_request).permit(:value, :voucher_type).merge(user_id: @user[:id])
  end
end
