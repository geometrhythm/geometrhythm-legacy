class CreateRhythms < ActiveRecord::Migration
  def change
    create_table :rhythms do |t|
      t.integer :creator_id, null: false
      t.string :rhythm_str, null: false
      t.integer :play_count, default: 0

      t.timestamps null: false
    end

    add_index :rhythms, :creator_id
    add_index :rhythms, :rhythm_str, unique: true
  end
end
