class Rhythm < ActiveRecord::Base
  validates :creator_id, :rhythm_str, :play_count, presence: true

  belongs_to :user, foreign_key: :creator_id

  has_many :likings, class_name: 'Like', foreign_key: :rhythm_id
  has_many :likers, through: :likings, source: :liker

  has_many :namings
  has_many :names, through: :namings, source: :name
  has_many :namers, through: :namings, source: :namer

  has_many :comments, as: :commentable

  def len
    rhythm_str.length
  end

  def onset_count
    durational_pattern.length
  end

  def contour
    output = []
    (0...onset_count).each do |i|
      i == onset_count - 1 ? j = 0 : j = i + 1
      if durational_pattern[j] < durational_pattern[i]
        output << "-"
      elsif durational_pattern[j] > durational_pattern[i]
        output << "+"
      else
        output << "0"
      end
    end

    output
  end

  def full_intervals_onset_pairs
    full_intervals_onset_pairs = Array.new(len / 2) { [] }
    (0...onset_count).each do |i|
      (i + 1...onset_count).each do |j|
        full_intervals_onset_pairs[geodesic_distance(i, j) - 1] <<
          [onset_indices[i], onset_indices[j]]
      end
    end

    full_intervals_onset_pairs
  end

  def full_interval_content
    full_interval_content = Array.new(len / 2) { 0 }
    (0...onset_count).each do |i|
      (i + 1...onset_count).each do |j|
        full_interval_content[geodesic_distance(i, j) - 1] += 1
      end
    end

    full_interval_content
  end

  def full_interval_content_entropy
    interval_content_entropy(:full)
  end

  def adjacent_interval_content_entropy
    interval_content_entropy(:adjacent)
  end

  def interval_content_entropy(option)
    if option == :full
      interval_content = full_interval_content
    elsif option == :adjacent
      interval_content = adjacent_interval_content
    end

    total = interval_content.inject(:+) #this is also just ?_interval_count
    probs = []
    (0...interval_content.length).each do |i|
      probs << interval_content[i] / total.to_f
    end

    entropy = 0
    probs.each do |prob|
      next if prob == 0
      entropy += (prob * Math.log(prob, 2))
    end

    -entropy
  end

  def adjacent_interval_count
    onset_count
  end

  def full_interval_count
    onset_count * (onset_count - 1) / 2
  end

  def longest_interval
    longest_interval = 0
    (0...onset_count).each do |i|
      (i + 1...onset_count).each do |j|
        longest_interval = geodesic_distance(i, j) if geodesic_distance(i, j) > longest_interval
      end
    end

    longest_interval
  end

  def adjacent_interval_content
    output = Array.new(len) { 0 }
    durational_pattern.each do |duration|
      output[duration] += 1
    end

    output
  end

  def distinct_durations
    total = 0
    full_interval_content.each do |duration|
      total += 1 if duration != 0
    end

    total
  end

  def distinct_adjacent_durations
    total = 0
    adjacent_interval_content.each do |duration|
      total += 1 if duration != 0
    end

    total
  end

  def geodesic_distance(onset_1_idx, onset_2_idx)
    onset_1_idx, onset_2_idx = onset_2_idx, onset_1_idx if onset_2_idx < onset_1_idx
    clockwise_d = durational_pattern[onset_1_idx...onset_2_idx].inject(:+)
    c_clockwise_d = len - clockwise_d
    return [clockwise_d, c_clockwise_d].min
  end

  def interval_vector
    "(" + full_interval_content.join(", ") + ")"
  end

  def factors
    output = []
    (1..len).each do |i|
      output << i if len % i == 0
    end

    output
  end

  def metric_hierarchy
    output = Array.new(len) { 0 }
    factors.each do |factor|
      i = 0
      while i < len
        output[i] += 1
        i += factor
      end
    end

    output
  end

  def flat?
    full_interval_content.none? { |duration| duration > 1 }
  end

  def perfectly_flat?
    full_interval_content.all? { |duration| duration == 1 }
  end

  def has_all_intervals?
    full_interval_content.all? { |duration| duration >= 1 }
  end

  def tallness
    full_interval_content.max
  end

  def deep?
    full_interval_content.uniq.length == full_interval_content.length
  end

  def shallowness
    deep_interval_content = Array.new(onset_count - 1) { 0 }
    (1..onset_count - 1).each { |i| deep_interval_content[i] = i }
    abbrev = full_interval_content.reject{ |i| i == 0 }.sort

    (abbrev.length - deep_interval_content.length).times do
      deep_interval_content.unshift(0)
    end

    total = 0
    abbrev.each_with_index do |duration, index|
      total += (deep_interval_content[index] - duration).abs
    end

    total
  end

  def max_metric_expectedness
    metric_hierarchy.sort.reverse[0...onset_count].inject(:+)
  end

  def metric_expectedness
    total = 0
    rhythm_str.split("").each_with_index do |cell, i|
      total += metric_hierarchy[i] if cell == "x"
    end

    total
  end

  def metric_syncopation
    max_metric_expectedness - metric_expectedness
  end

  def offbeatness
    total = 0
    rhythm_str.split("").each_with_index do |cell, i|
      total += 1 if cell == "x" && metric_hierarchy[i] == 1
    end

    total
  end

  def strongbeatness
    total = 0
    rhythm_str.split("").each_with_index do |cell, i|
      total += 1 if cell == "x" && metric_hierarchy[i] >= factors.length - 2
    end

    total
  end

  def has_closure?
    # puts "factors: #{factors}"
    # puts "checked factor: #{factors[-3]}"
    # puts "closure el: #{((factors[-2] * (((rhythm_str.length / (factors[-2]))) - 1) - 1)}"
    # puts  "lcosuer el is: #{rhythm_str[(factors[-2] * (((rhythm_str.length / (factors[-2]))) - 1) - 1]}"
    # factors.length > 2 && rhythm_str[(factors[-2] * (((rhythm_str.length / (factors[-2]))) - 1) - 1] == "x"
    # puts "much simpler?"
    # puts factors[-3]
    # puts rhythm_str[-factors[-3]]
    # factors.length > 2 && rhythm_str[-factors[-3]] == "x"
    i = len
    while (i > 0)
      i = i - 1
      if metric_hierarchy[i] > 2
        if rhythm_str[i] == "x"
          return true
        else
          return false
        end
      end
    end

    false
  end

  def closure_index
    i = len
    while (i > 0)
      i = i - 1
      if metric_hierarchy[i] > 2
        if rhythm_str[i] == "x"
          return i
        else
          return nil
        end
      end
    end

    nil
  end

  def has_anacrusis?
    rhythm_str[0] == "-"
  end

  def durational_pattern
    output, i, initial_onset, count = [], 0, -1, -1
    until i == initial_onset
      if rhythm_str[i] == "x"
        initial_onset == -1 ? initial_onset = i : output << count
        count = 0
      end
      count = count + 1 if defined?(count)
      i = i + 1
      i = 0 if i > rhythm_str.length
    end
    output << count - 1

    output
  end

  def irregularity
    return nil if factors.length <= 2
    total = 0
    factors[1...-1].each do |factor|
      max_even_rhythm_by_factor = Array.new(len) { "-" }
      i = 0
      while i < len
        max_even_rhythm_by_factor[i] = "x"
        i += factor
      end

      total += edit_distance(max_even_rhythm_by_factor)
    end

    total / (factors.length - 2)
  end

  def edit_distance(other_rhythm_str)
    total = 0
    onset_indices.each do |onset_i|
      edit_dist = 0
      while true
        break if other_rhythm_str[onset_i + edit_dist] == "x"
        break if other_rhythm_str[onset_i - edit_dist] == "x"
        edit_dist += 1
      end
      total += edit_dist
    end

    total
  end

  def onset_indices
    output = []
    rhythm_str.split("").each_with_index do |cell, i|
      output << i if cell == "x"
    end

    output
  end

  def self.power_of_2?(number)
    return false if number % 1 != 0
    number != 0 && number & (number - 1) == 0
  end

  def arity
    if self.class.power_of_2?(rhythm_str.length)
      "binary"
    elsif self.class.power_of_2?(rhythm_str.length / 3.0)
      "ternary"
    else
      nil
    end
  end

  def odd?
    return false if len % 2 != 0
    onset_indices.each do |onset_index|
      return false if antipode(onset_index) == "x"
    end

    true
  end

  def antipode(index)
    convenience_rhythm_str[index + (len / 2)]
  end

  def antipode_index(index)
    (index + (len / 2)) % len
  end

  def other_antipode_index(index)
    (index + (len / 2) + 1) % len
  end

  def oddity
    total = 0
    onset_indices.each do |onset_index|
      edit_dist = 0
      while true
        break if rhythm_str[antipode_index(onset_index) + edit_dist] == "x"
        break if rhythm_str[antipode_index(onset_index) - edit_dist] == "x"
        edit_dist += 1
      end
      total += edit_dist
    end
    total = (total + odd_oddity) / 2 if len % 2 != 0

    total
  end

  def odd_oddity
    total = 0
    onset_indices.each do |onset_index|
      edit_dist = 0
      while true
        break if rhythm_str[other_antipode_index(onset_index) + edit_dist] == "x"
        break if rhythm_str[other_antipode_index(onset_index) - edit_dist] == "x"
        edit_dist += 1
      end
      total += edit_dist
    end

    total
  end

  def convenience_rhythm_str
    rhythm_str + rhythm_str
  end

  def convenience_durational_pattern
    durational_pattern + durational_pattern
  end

  def unevenness
    npvi = 0
    (0...durational_pattern.length - 1).each do |i|
      npvi += ((durational_pattern[i] - durational_pattern[i + 1]) /
        (( durational_pattern[i] + durational_pattern[i + 1]) / 2.0 ) ).abs
    end
    npvi * 100.0 / (durational_pattern.length - 1).to_f
  end

  def symmetries_by_onset
    return [] if len % 2 != 0
    symmetries = []
    # puts convenience_rhythm_str
    (0...len/2).each do |i|
      # puts ""
      symmetrical = true
      # puts "first half: #{convenience_rhythm_str[(1 + i)..((len / 2) - 1 + i)]}"
      j = 0;
      convenience_rhythm_str[(1 + i)..((len / 2) - 1 + i)].split("").each do |cell|
        # puts "comparing #{cell} to convstr idx #{((len - 1) + i) - j} which is #{convenience_rhythm_str[((len - 1) + i) - j]}"
        if convenience_rhythm_str[((len - 1) + i) - j] != cell
          # puts "  WASNT EQUAL"
          symmetrical = false
          break
        end
        j = j + 1;
      end
      symmetries << i if symmetrical == true

        # puts "  JUST ADDED #{i} to symmetries!"
      # else
        # "  didn't add no non-symmetrical thang"
      # end
    end

    symmetries
  end

  def symmetries_by_interonset
    return [] if len % 2 != 0
    symmetries = []
    (0...len/2).each do |i|
      symmetrical = true
      j = 0
      convenience_rhythm_str[i..(len / 2) + i].split("").each do |cell|
        if convenience_rhythm_str[((len - 1) + i) - j] != cell
          symmetrical = false
          break
        end
        j = j + 1
      end
      symmetries << (i - 1) if symmetrical == true
    end

    symmetries
  end

  def symmetries_for_odd_rhythm
    #ARGH!!! HAVE TO GO THROUGH TWICE, ONCE: FIRST HALF'S ONSETS, TWICE: FIRST HALF'S INTERONSETS
    return [] if len % 2 == 0
    symmetries = []
    (0...len/2).each do |i|
      puts "i is now #{i}"
      symmetrical = true
      j = 1
      puts "first half is #{convenience_rhythm_str[i...(len / 2) + i]}"

      convenience_rhythm_str[i...(len / 2) + i].split("").each do |cell|
        puts "this second half index is #{(((len - 1) + i) - j)}"
        puts "this second half el is #{convenience_rhythm_str[((len - 1) + i) - j]}"
        if convenience_rhythm_str[((len - 1) + i) - j] != cell
          symmetrical = false
          puts "nope not match"
          break
        end
        puts "matched, moving on"
        j = j + 1
      end
      if symmetrical == true
        symmetries << (i - 1)
        puts "ADDED THIS ONE!"
      end
    end
    puts "symmetries_for_odd_rhythm_after_checking_only_by_onset_yet: #{symmetries}"

    (0...len/2).each do |i|
      puts "i is now #{i}"
      symmetrical = true
      j = 0
      puts "first half is #{convenience_rhythm_str[i...(len / 2) + i]}"

      convenience_rhythm_str[i...(len / 2) + i].split("").each do |cell|
        puts "this second half index is #{(((len - 1) + i) - j)}"
        puts "this second half el is #{convenience_rhythm_str[((len - 1) + i) - j]}"
        if convenience_rhythm_str[((len - 1) + i) - j] != cell
          symmetrical = false
          puts "nope not match"
          break
        end
        puts "matched, moving on"
        j = j + 1
      end
      if symmetrical == true
        symmetries << (i - 1)
        puts "ADDED THIS ONE!"
      end
    end
    puts "all symmetries including the ones found by checking interonsets in the first half: #{symmetries}"
    symmetries
  end

  def onset_distinct_distance_complexity
    total = 0
    (0...onset_count).each do |i|
      this_onset_distinct_distances = []
      (0...onset_count).each do |j|
        if i == j
          # puts "i & j: #{i}"
          next
        end
        # puts "i: #{i}, j: #{j}"
        unless this_onset_distinct_distances.include?(geodesic_distance(i, j))
          this_onset_distinct_distances << geodesic_distance(i, j)
        end
      end
      total += this_onset_distinct_distances.count
    end

    total
  end

  def complexity_by_onset
    output = []
    (0...onset_count).each do |i|
      this_onset_distinct_distances = []
      (0...onset_count).each do |j|
        if i == j
          # puts "i & j: #{i}"
          next
        end
        # puts "i: #{i}, j: #{j}"
        unless this_onset_distinct_distances.include?(geodesic_distance(i, j))
          this_onset_distinct_distances << geodesic_distance(i, j)
        end
      end
      output << this_onset_distinct_distances.count
    end

    output
  end

  def onset_complexity_onset_pairs
    output = []
    (0...onset_count).each do |i|
      output << []
      (0...onset_count).each do |j|
        next if i == j
        output[i] << [ onset_indices[i] , onset_indices[j] ]
      end
    end

    output
  end

  def onset_complexity_interval_durations
    output = []
    (0...onset_count).each do |i|
      output << []
      (0...onset_count).each do |j|
        next if i == j
        output[i] << (onset_indices[i] - onset_indices[j]).abs % len
      end
    end

    output
  end

  def whatever_onsets
    output = []
    (0...onset_count).each do |i|
      puts "working on #{i}"
      output << Array.new(len) { false }
      (0...onset_count).each do |j|
        next if i == j
        # puts "onset_index[i]: #{onset_indices[i]}"
        # puts "  onset_index[j]: #{onset_indices[j]}"
        # puts "geodesic_distance(i, j): #{geodesic_distance(i, j)}"
        puts "  found #{geodesic_distance(i, j)}"
        output[i][geodesic_distance(i, j) - 1] = true;
      end
    end

    output
  end

  # def onset_complexity_display_data
  #   output = []
  #   (0...onset_count).each do |i|
  #     output << Array.new(durational_pattern.max - durational_pattern.min)
  #     (0...onset_count).each do |j|
  #       next if i == j
  #       output[i] << (i - j).abs % len
  #     end
  #   end
  #
  #   output
  # end

  def shelling_count
    total = 0
    (0...onset_count).each do |i|
      this_onset_distinct_distances = []
      (0...onset_count).each do |j|
        next if i == j
        unless this_onset_distinct_distances.include?(geodesic_distance(i, j))
          this_onset_distinct_distances << geodesic_distance(i, j)
        end
      end
      total += 1 if this_onset_distinct_distances.count == distinct_durations
    end

    total
  end

  def perfectly_even?
    durational_pattern.all? { |duration| duration == durational_pattern[0] }
  end

  def maximally_even?
    maximally_even_by_tolerance?(0.5)
  end

  def almost_maximally_even?
    maximally_even_by_tolerance?(1.0)
  end

  def maximally_even_by_tolerance?(tolerance)
    even_division = len / onset_count.to_f
    anchor = 0
    until anchor >= even_division

      even_marks = [anchor]
      i = anchor
      while i < len
        i += even_division
        even_marks << i
      end

      onset_indices.each do |onset_index|
        this_max_even = false
        even_marks.each do |even_mark|
          this_max_even = true if (even_mark - onset_index).abs < tolerance
        end
        return false if this_max_even == false
      end
      # p anchor
      anchor += 0.001
    end

    true
  end

  # for the bipartitions of an interonset diameter,
  # consider the difference in their onset counts:
  # if greater than 1, add that amount to the total.
  def imbalance
    total = 0
    (0...len).each do |i|
      first_half_count, second_half_count = 0, 0
      # j = (len/2) + i > len - 1 ? (len/2) + i - len : (len/2) + i
      # k =
      # puts "first half is #{i} through #{(len / 2) + i} excluding"
      convenience_rhythm_str[i...(len / 2) + i].split("").each do |cell|
        first_half_count += 1 if cell == "x"
      end
      # puts "second half is #{(len / 2) + i} through #{len + i} excluding"
      convenience_rhythm_str[(len / 2) + i...len + i].split("").each do |cell|
        second_half_count += 1 if cell == "x"
      end
      # puts "i: #{i}"
      # puts "  first_half_count:  #{first_half_count}"
      # puts "  second_half_count: #{second_half_count}"
      result = (first_half_count - second_half_count).abs
      if result > 1
        total += result - 1
      end
    end

    total = total / 2
    total
  end

  def toggle_rhythm?
    (0...len).each do |i|

      first_half_onsets = nil
      convenience_rhythm_str[i...(len / 2) + i].split("").each do |cell|
        if cell == "x"
          if first_half_onsets.nil?
            first_half_onsets = i % 2 ? :even : :odd
          elsif first_half_onsets == :even && i % 2 != 0 ||
            first_half_onsets == :odd && i % 2 == 0
            first_half_onsets = :mixed
            break
          end
        end
      end

      return true if first_half_onsets.nil?
      next if first_half_onsets == :mixed

      flag = true
      if first_half_onsets == :even
        convenience_rhythm_str[(len / 2) + i...len + i].split("").each do |cell|
          if cell == "x" && i % 2 == 0
            flag = false
            break
          end
        end
      elsif first_half_onsets == :even
        convenience_rhythm_str[(len / 2) + i...len + i].split("").each do |cell|
          if cell == "x" && i % 2 != 0
            flag = false
            break
          end
        end
      end

      return true if flag == true
    end

    false
  end

end
