class CreateRhythms < ActiveRecord::Migration
  def change
    create_table :rhythms do |t|

      t.timestamps null: false
    end
  end
end
