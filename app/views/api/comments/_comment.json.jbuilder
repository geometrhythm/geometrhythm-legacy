json.extract! comment, :body, :id

json.commenter comment.user.email

json.comments comment.comments do |comment|
  json.body comment.body
  json.commenter comment.user.email
  json.id comment.id

  json.comments comment.comments do |subcomment|
    json.partial! 'api/comments/comment', comment: subcomment
  end
end
