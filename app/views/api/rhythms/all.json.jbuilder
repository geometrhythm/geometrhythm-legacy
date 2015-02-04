json.array! @rhythms do |rhythm|
  json.rhythm_str rhythm.rhythm_str
  json.play_count rhythm.play_count
  json.creator_id rhythm.creator_id
  json.creator rhythm.user.email
end
