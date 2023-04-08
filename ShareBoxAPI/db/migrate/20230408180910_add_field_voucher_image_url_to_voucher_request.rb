class AddFieldVoucherImageUrlToVoucherRequest < ActiveRecord::Migration[7.0]
  def change
    add_column :voucher_requests, :voucher_image_url, :string
    add_column :voucher_requests, :voucher_code, :string
  end
end
