class CreateVoucherRequests < ActiveRecord::Migration[7.0]
  def change
    create_table :voucher_requests do |t|
      t.references :user, null: false, foreign_key: true
      t.string :type
      t.float :value

      t.timestamps
    end
  end
end
