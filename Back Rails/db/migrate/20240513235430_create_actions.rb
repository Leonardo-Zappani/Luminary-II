class CreateActions < ActiveRecord::Migration[7.1]
  def change
    create_table :actions do |t|
      t.string :name
      t.string :description

      t.string :assigned_to_ids
      t.string :artifact_ids

      t.timestamps
    end
  end
end
