class Api::V1::VoucherRequestsController < Api::V1::AuthController
  before_action :authorized

  def index
    @voucher_requests = VoucherRequest.all.order(created_at: :desc)
    render json: { voucher_requests: @voucher_requests }
  end

  # POST create voucher request
  def create
    @voucher_request = VoucherRequest.create(voucher_request_params)
    if @voucher_request.valid?
      render json: { voucher_request: @voucher_request }
    else
      render error: { error: 'Unable to create voucher request' }, status: 400
    end
  end

  # PATCH update voucher request
  def update
    # custom params because this endpoint do not need voucher_request params
    update_params = params.permit(:id, :value, :voucher_type).merge(user_id: @user[:id])
    user_request_id = update_params[:user_id]
    voucher_id = update_params[:id]
    @voucher_request = VoucherRequest.where(id: voucher_id).update(taken_by_user_id: user_request_id)
    render json: { message: 'Success', data: @voucher_request }, status: :ok
  end

  def fetch_voucher_requests_by_user
    user_id = voucher_request_params[:user_id].to_i
    if user_id != @user[:id]
      render error: { error: 'unauthorized' }, status: :unauthorized
    else
      @voucher_requests = VoucherRequest.where('user_id = ?', user_id).order(created_at: :desc)
      render json: { voucher_requests: @voucher_requests }
    end
  end

  def voucher_request_params
    params.require(:voucher_request).permit(:id, :value, :voucher_type).merge(user_id: @user[:id])
  end
end
