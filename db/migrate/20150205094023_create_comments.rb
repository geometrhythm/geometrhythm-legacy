class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.string :body, null: false
      t.references :commentable, null: false, polymorphic: true, index: true
      t.integer :user_id, null: false

      t.timestamps null: false
    end

    add_index :comments, :user_id
  end
end
