json.extract! @rhythm, :rhythm_str, :play_count, :creator_id

# json.creator @rhythm.creator.email
json.creator @rhythm.user.email
