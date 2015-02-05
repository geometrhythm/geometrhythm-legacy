json.extract! rhythm, :rhythm_str, :play_count, :creator_id, :id

json.creator rhythm.user.email

json.likers rhythm.likers do |liker|
  json.id liker.id
  json.email liker.email
end

json.namings rhythm.namings do |naming|
  json.name naming.name
  json.namer naming.namer
end

json.comments rhythm.comments do |comment|
  json.partial! 'api/comments/comment', comment: comment
end
