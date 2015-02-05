u1 = User.find_by(email: 'douglas.blumeyer@gmail.com') ||
  User.create(email: 'douglas.blumeyer@gmail.com', password: 'password')

r1 = u1.rhythms.create(rhythm_str: "x--x--x---x-x---")
r2 = u1.rhythms.create(rhythm_str: "xx-x--x-x--x-")
r3 = u1.rhythms.create(rhythm_str: "x-xx-x-xx-xxx-x-xxx-")
r4 = u1.rhythms.create(rhythm_str: "x-xx-x-xx-xxx-x-xxx-xxx-x-x-xx")
# b1.members = [u2]
# b1.save


u2 = User.find_by(email: 'euclid_algorithm@geometrhythm.com') ||
  User.create(email: 'euclid_algorithm@geometrhythm.com', password: 'granddaddy')

def euclid_rhythm(num_onsets, num_pulses)
  return nil if num_pulses % num_onsets == 0
  euclid_arr = Array.new(num_pulses) { ["-"] }
  (0...num_onsets).each { |i| euclid_arr[i] = ["x"] }
  until ( euclid_arr.all? { |el| el.count == euclid_arr[0].count } &&
    euclid_arr[0].count != 1 ) || euclid_arr[-1].count != euclid_arr[-2].count
    diff = euclid_arr.count - num_onsets
    num_onsets = [diff, num_onsets].min
    new_diff = euclid_arr.count - num_onsets
    (0...num_onsets).each do |i|
      euclid_arr[i].concat(euclid_arr[i + new_diff])
    end
    euclid_arr = euclid_arr.slice(0, new_diff)
  end

  euclid_arr.flatten.join("")
end

def euclid_rhythms_of_length(length)
  output = []
  (2...length).each do |num_onsets|
    next if length % num_onsets == 0
    output << euclid_rhythm(num_onsets, length)
  end

  output
end

[6, 8, 12, 16, 24].each do |length|
  euclid_rhythms_of_length(length).each do |e_r_o_l|
    u2.rhythms.create(rhythm_str: e_r_o_l)
  end
end
