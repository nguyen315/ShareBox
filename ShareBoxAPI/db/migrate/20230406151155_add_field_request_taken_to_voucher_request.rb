class AddFieldRequestTakenToVoucherRequest < ActiveRecord::Migration[7.0]
  def change
    add_reference :voucher_requests, :taken_by_user, foreign_key: { to_table: :users }
  end
end
