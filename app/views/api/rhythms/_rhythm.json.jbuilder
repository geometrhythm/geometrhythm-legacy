json.extract! rhythm, :rhythm_str, :play_count, :creator_id, :id

json.creator rhythm.user.email

json.likers rhythm.likers do |liker|
  json.id liker.id
  json.email liker.email
end
