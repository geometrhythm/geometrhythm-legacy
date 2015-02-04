class Rhythm < ActiveRecord::Base
  validates :creator_id, :rhythm_str, :play_count, presence: true
  belongs_to :user, foreign_key: :creator_id
  has_many :likers, through: :likings, source: :liker
  has_many :likings, class_name: 'Like', foreign_key: :rhythm_id
end
