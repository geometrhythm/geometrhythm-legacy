json.extract! rhythm, :rhythm_str, :play_count, :creator_id, :id,
  :durational_pattern, :contour, :full_interval_content,
  :full_interval_content_entropy, :interval_vector, :flat?,
  :perfectly_flat?, :has_all_intervals?, :tallness, :deep?,
  :shallowness, :distinct_durations, :metric_syncopation, :offbeatness,
  :strongbeatness, :has_closure?, :has_anacrusis?, :irregularity,
  :oddity, :odd?, :unevenness, :symmetries_by_onset,
  :symmetries_by_interonset, :adjacent_interval_content_entropy,
  :adjacent_interval_content, :onset_distinct_distance_complexity,
  :shelling_count, :perfectly_even?, :maximally_even?, :almost_maximally_even?,
  :imbalance, :metric_hierarchy, :len, :full_intervals_onset_pairs

if rhythm.id
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
end
