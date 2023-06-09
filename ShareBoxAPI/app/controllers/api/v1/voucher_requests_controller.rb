require 'cloudinary'
require 'cloudinary/uploader'
require 'cloudinary/utils'

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

  def show
    show_params = params.permit(:id).merge(user_id: @user[:id])
    @voucher_request = VoucherRequest.find_by_id(show_params[:id])
    user_own_request = User.find_by_id(@voucher_request[:user_id])
    user_handle_request = User.includes(:payments).find_by_id(@voucher_request[:taken_by_user_id])
    print("#####{user_handle_request.payments[0]}")

    if !user_handle_request.nil? && (user_handle_request[:id] != show_params[:user_id] && user_own_request[:id] != show_params[:user_id])
      return render error: { error: 'unauthorized' }, status: :unauthorized
    end

    render json: { voucher_request: @voucher_request,
                   include: { users: [user_own_request, user_handle_request.as_json(include: :payments)] } }
  end

  # PATCH update voucher request
  def update
    # custom params because this endpoint do not need voucher_request params
    update_params = params.permit(:id).merge(user_id: @user[:id])
    user_request_id = update_params[:user_id]
    user_request = User.find_by_id(user_request_id)
    voucher_id = update_params[:id]

    @voucher_request = VoucherRequest
                       .where(id: voucher_id)
                       .update(taken_by_user_id: user_request_id)
                       .first

    user = User.find_by_id(@voucher_request.user_id)
    render json: { message: 'Success',
                   data: { voucher_request: @voucher_request, include: { users: [user, user_request] } } },
           status: :ok
  end

  def submit_voucher
    voucher_request_id = params[:voucher_request_id]
    voucher_code = params[:voucher_code]
    image = params[:image]
    image_url = upload_to_cloudinary(image)

    @voucher_request = VoucherRequest
                       .where(id: voucher_request_id)
                       .update(voucher_image_url: image_url, voucher_code: voucher_code)
                       .first

    user = User.find_by_id(@voucher_request.user_id)

    render json: {
             message: 'Success',
             data: { voucher_request: @voucher_request, include: { users: [@user, user] } }
           },
           status: :ok
  end

  def upload_to_cloudinary(image)
    Cloudinary.config do |config|
      config.cloud_name = ENV['CLOUD_NAME']
      config.api_key = ENV['CLOUD_API_KEY']
      config.api_secret = ENV['CLOUD_API_SECRET']
      config.secure = true
    end

    # Upload the image to Cloudinary and get the URL
    result = Cloudinary::Uploader.upload(image.tempfile, resource_type: 'auto')
    result['secure_url']
  end

  def fetch_voucher_requests_by_user
    user_id = params[:user_id].to_i
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
