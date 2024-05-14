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

ActiveRecord::Schema[7.1].define(version: 2024_05_14_003728) do
  create_table "actions", force: :cascade do |t|
    t.string "name"
    t.string "description"
    t.string "assigned_to_ids"
    t.string "artifact_ids"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "artifacts", force: :cascade do |t|
    t.string "name"
    t.string "description"
    t.string "type"
    t.string "status"
    t.integer "actions_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["actions_id"], name: "index_artifacts_on_actions_id"
  end

  create_table "items", force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "action_id"
    t.index ["action_id"], name: "index_items_on_action_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "email"
    t.string "password_digest"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "artifacts", "actions", column: "actions_id"
  add_foreign_key "items", "actions"
end
