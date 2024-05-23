class Artifact < ApplicationRecord

  def user_names
    User.where(id: assigned_ids).where.not(name: nil).pluck(:name).join(', ')
  end

  def assigned_ids
    return nil if user_ids.nil? || user_ids.empty?

    user_ids.split(',')
  end

  def item_names
    Item.where(id: assigned_item_ids).pluck(:name).join(', ')
  end

  def item_grouped_names
    Item.where(id: assigned_item_ids).map do |item|
      "#{item.name}: #{item.description}"
    end.flatten.first
  end

  def assigned_item_ids
    return nil if item_ids.nil? || item_ids.empty?

    item_ids.split(',')
  end
end
