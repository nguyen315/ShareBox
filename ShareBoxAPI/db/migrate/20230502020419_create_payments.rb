class CreatePayments < ActiveRecord::Migration[7.0]
  def change
    create_table :payments do |t|
      t.references :user, null: false, foreign_key: true
      t.string :method
      t.string :account_number

      t.timestamps
    end
  end
end
