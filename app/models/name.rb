class Name < ActiveRecord::Base
  validates :name, presence: true

  has_many :namings
  has_many :rhythms_named, through: :namings, source: :rhythm
end
