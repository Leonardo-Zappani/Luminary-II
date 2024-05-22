class CreateArtifacts < ActiveRecord::Migration[7.1]
  def change
    create_table :artifacts do |t|
      t.string :name
      t.string :description
      t.string :status
      t.references :actions, null: true, foreign_key: true

      t.timestamps
    end
  end
end
