json.array! @rhythms do |rhythm|
  json.partial! 'rhythm', rhythm: rhythm
end
