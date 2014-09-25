# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20140923180753) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "car_listings", force: true do |t|
    t.integer  "leaser_id",                   null: false
    t.string   "title",                       null: false
    t.text     "description",                 null: false
    t.integer  "rate",                        null: false
    t.integer  "deposit",                     null: false
    t.string   "cancellation",                null: false
    t.boolean  "active",       default: true, null: false
    t.integer  "car_year",                    null: false
    t.string   "car_make",                    null: false
    t.string   "car_model",                   null: false
    t.string   "car_color",                   null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "requests", force: true do |t|
    t.date     "start_date",                         null: false
    t.date     "end_date",                           null: false
    t.integer  "car_listing_id",                     null: false
    t.integer  "leasee_id",                          null: false
    t.string   "status",         default: "Pending", null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "requests", ["car_listing_id", "leasee_id"], name: "index_requests_on_car_listing_id_and_leasee_id", unique: true, using: :btree

  create_table "users", force: true do |t|
    t.string   "email",           null: false
    t.string   "password_digest", null: false
    t.string   "session_token",   null: false
    t.string   "first_name",      null: false
    t.string   "last_name",       null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
