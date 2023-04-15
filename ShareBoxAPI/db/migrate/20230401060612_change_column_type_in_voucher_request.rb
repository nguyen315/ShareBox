class ChangeColumnTypeInVoucherRequest < ActiveRecord::Migration[7.0]
  def change
    remove_column :voucher_requests, :type, :string
    add_column :voucher_requests, :voucher_type, :string
  end
end
