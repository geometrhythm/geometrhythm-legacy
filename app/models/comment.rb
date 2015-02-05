class Comment < ActiveRecord::Base
  validates :user_id, :body, presence: true
  belongs_to :commentable, polymorphic: true
  belongs_to :user

  has_many :comments, as: :commentable
end
