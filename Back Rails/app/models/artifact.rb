class Artifact < ApplicationRecord

  def user_names
    User.where(id: parsed_user_ids).where.not(name: nil).pluck(:name).join(', ')
  end

  def item_names
    Item.where(id: parsed_item_ids).pluck(:name).join(', ')
  end

  def item_grouped_names
    Item.where(id: parsed_item_ids).map do |item|
      "#{item.name}: #{item.description}"
    end.join(', ')
  end

  private

  def parsed_user_ids
    parse_ids(user_ids)
  end

  def parsed_item_ids
    parse_ids(item_ids)
  end

  def parse_ids(ids)
    ids.present? ? ids.split(',') : []
  end
end
