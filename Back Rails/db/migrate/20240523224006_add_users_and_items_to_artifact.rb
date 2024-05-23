class AddUsersAndItemsToArtifact < ActiveRecord::Migration[7.1]
  def change
    add_column :artifacts, :user_ids, :string
    add_column :artifacts, :item_ids, :string
  end
end
