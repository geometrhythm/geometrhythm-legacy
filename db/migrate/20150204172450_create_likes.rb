class CreateLikes < ActiveRecord::Migration
  def change
    create_table :likes do |t|
      t.integer :rhythm_id, null: false
      t.integer :liker_id, null: false

      t.timestamps null: false
    end

    add_index :likes, :rhythm_id
    add_index :likes, :liker_id
    add_index :likes, [:rhythm_id, :liker_id], unique: true
  end
end
