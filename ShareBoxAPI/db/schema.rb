# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_04_08_180910) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "password_digest"
    t.index ["username"], name: "index_users_on_username", unique: true
  end

  create_table "voucher_requests", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.float "value"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "voucher_type"
    t.bigint "taken_by_user_id"
    t.string "voucher_image_url"
    t.string "voucher_code"
    t.index ["taken_by_user_id"], name: "index_voucher_requests_on_taken_by_user_id"
    t.index ["user_id"], name: "index_voucher_requests_on_user_id"
  end

  create_table "vouchers", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.string "code"
    t.string "verify_code"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_vouchers_on_user_id"
  end

  add_foreign_key "voucher_requests", "users"
  add_foreign_key "voucher_requests", "users", column: "taken_by_user_id"
  add_foreign_key "vouchers", "users"
end
