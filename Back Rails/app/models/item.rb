class Item < ApplicationRecord
  belongs_to :artifact, optional: true
end
