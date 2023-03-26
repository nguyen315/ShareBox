class CreateVouchers < ActiveRecord::Migration[7.0]
  def change
    create_table :vouchers do |t|
      t.references :user, null: false, foreign_key: true
      t.string :code
      t.string :verify_code

      t.timestamps
    end
  end
end
