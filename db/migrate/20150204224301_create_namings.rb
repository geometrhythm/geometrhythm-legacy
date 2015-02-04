class CreateNamings < ActiveRecord::Migration
  def change
    create_table :namings do |t|
      t.integer :name_id, null: false
      t.integer :namer_id, null: false
      t.integer :rhythm_id, null: false

      t.timestamps null: false
    end

    add_index :namings, :name_id
    add_index :namings, :namer_id
    add_index :namings, :rhythm_id
    add_index :namings, [:name_id, :namer_id, :rhythm_id], unique: true
  end
end
