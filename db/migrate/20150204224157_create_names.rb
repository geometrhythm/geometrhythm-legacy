class CreateNames < ActiveRecord::Migration
  def change
    create_table :names do |t|
      t.string :name, null: false

      t.timestamps null: false
    end
  end
end
