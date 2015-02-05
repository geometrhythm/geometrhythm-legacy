class Rhythm < ActiveRecord::Base
  validates :creator_id, :rhythm_str, :play_count, presence: true

  belongs_to :user, foreign_key: :creator_id

  has_many :likings, class_name: 'Like', foreign_key: :rhythm_id
  has_many :likers, through: :likings, source: :liker

  has_many :namings
  has_many :names, through: :namings, source: :name
  has_many :namers, through: :namings, source: :namer

  has_many :comments, as: :commentable
end
