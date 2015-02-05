json.extract! user, :id, :email

json.liked_rhythms user.liked_rhythms do |liked_rhythm|
  json.id liked_rhythm.id
end

json.created_rhythms user.rhythms do |created_rhythm|
  json.id created_rhythm.id
end
