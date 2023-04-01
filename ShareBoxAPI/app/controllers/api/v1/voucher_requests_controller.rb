class Api::V1::VoucherRequestsController < Api::V1::AuthController
  before_action :authorized

  def index
    @voucher_requests = VoucherRequest.all.order(created_at: :desc)
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
    params.require(:voucher_request).permit(:value, :voucher_type).merge(user_id: @user[:id])
  end

  def get_voucher_requests_by_user
    user_id = params[:user_id].to_i
    puts "user_id: #{user_id} #{@user[:id]}"
    if user_id != @user[:id]
      render error: { error: 'unauthorized' }, status: :unauthorized
    else
      @voucher_requests = VoucherRequest.where("user_id = ?", user_id).order(created_at: :desc)
      puts "vouchers: #{@voucher_requests}"
      render json: {voucher_requests: @voucher_requests}
    end
  end
end
