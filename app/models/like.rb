class Like < ActiveRecord::Base
  validates :rhythm_id, :liker_id, presence: true
  validates_uniqueness_of :rhythm_id, scope: :liker_id

  belongs_to :rhythm
  belongs_to :liker, class_name: 'User', foreign_key: :liker_id
end
