class Naming < ActiveRecord::Base
  validates :name_id, :namer_id, :rhythm_id, presence: true
  validates_uniqueness_of :name_id, scope: [:namer_id, :rhythm_id]

  belongs_to :name
  belongs_to :namer, class_name: 'User', foreign_key: :namer_id
  belongs_to :rhythm
end
