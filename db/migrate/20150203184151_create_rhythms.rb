class CreateRhythms < ActiveRecord::Migration
  def change
    create_table :rhythms do |t|
      t.integer :creator_id, null: false
      t.string :rhythm_str, null: false
      t.integer :play_count, null: false

      t.timestamps null: false
    end
  end
end
