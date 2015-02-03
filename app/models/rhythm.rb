class Rhythm < ActiveRecord::Base
  validates :creator_id, :rhythm_str, :play_count, presence: true
  belongs_to :user, foreign_key: :creator_id
end
