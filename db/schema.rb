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

ActiveRecord::Schema.define(version: 20141002171332) do

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
    t.string   "address",                     null: false
    t.float    "latitude",                    null: false
    t.float    "longitude",                   null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "car_type"
  end

  add_index "car_listings", ["latitude"], name: "index_car_listings_on_latitude", using: :btree
  add_index "car_listings", ["leaser_id"], name: "index_car_listings_on_leaser_id", using: :btree
  add_index "car_listings", ["longitude"], name: "index_car_listings_on_longitude", using: :btree

  create_table "images", force: true do |t|
    t.string   "file_picker_url", null: false
    t.string   "car_listing_id",  null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "images", ["car_listing_id"], name: "index_images_on_car_listing_id", using: :btree

  create_table "requests", force: true do |t|
    t.date     "start_date",                         null: false
    t.date     "end_date",                           null: false
    t.integer  "car_listing_id",                     null: false
    t.integer  "leasee_id",                          null: false
    t.string   "status",         default: "PENDING", null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "requests", ["car_listing_id"], name: "index_requests_on_car_listing_id", using: :btree
  add_index "requests", ["leasee_id"], name: "index_requests_on_leasee_id", using: :btree

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
