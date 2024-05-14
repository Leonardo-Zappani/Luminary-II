class AddActionsToItems < ActiveRecord::Migration[7.1]
  def change
    add_reference :items, :action, null: true, foreign_key: true
  end
end
