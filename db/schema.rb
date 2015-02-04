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

ActiveRecord::Schema.define(version: 20150204224301) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "likes", force: :cascade do |t|
    t.integer  "rhythm_id",  null: false
    t.integer  "liker_id",   null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "likes", ["liker_id"], name: "index_likes_on_liker_id", using: :btree
  add_index "likes", ["rhythm_id", "liker_id"], name: "index_likes_on_rhythm_id_and_liker_id", unique: true, using: :btree
  add_index "likes", ["rhythm_id"], name: "index_likes_on_rhythm_id", using: :btree

  create_table "names", force: :cascade do |t|
    t.string   "name",       null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "namings", force: :cascade do |t|
    t.integer  "name_id",    null: false
    t.integer  "namer_id",   null: false
    t.integer  "rhythm_id",  null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "namings", ["name_id", "namer_id", "rhythm_id"], name: "index_namings_on_name_id_and_namer_id_and_rhythm_id", unique: true, using: :btree
  add_index "namings", ["name_id"], name: "index_namings_on_name_id", using: :btree
  add_index "namings", ["namer_id"], name: "index_namings_on_namer_id", using: :btree
  add_index "namings", ["rhythm_id"], name: "index_namings_on_rhythm_id", using: :btree

  create_table "rhythms", force: :cascade do |t|
    t.integer  "creator_id",             null: false
    t.string   "rhythm_str",             null: false
    t.integer  "play_count", default: 0
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
  end

  add_index "rhythms", ["creator_id"], name: "index_rhythms_on_creator_id", using: :btree
  add_index "rhythms", ["rhythm_str"], name: "index_rhythms_on_rhythm_str", unique: true, using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "email",           null: false
    t.string   "password_digest", null: false
    t.string   "session_token",   null: false
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["session_token"], name: "index_users_on_session_token", unique: true, using: :btree

end
