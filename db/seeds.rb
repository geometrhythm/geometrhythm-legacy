u1 = User.create(email: 'douglas.blumeyer@gmail.com', password: 'password')

r1 = u1.rhythms.create(rhythm_str: "x--x--x---x-x---")
r2 = u1.rhythms.create(rhythm_str: "xx-x--x-x--x-")
r3 = u1.rhythms.create(rhythm_str: "x-xx-x-xx-xxx-x-xxx-")
r4 = u1.rhythms.create(rhythm_str: "x-xx-x-xx-xxx-x-xxx-xxx-x-x-xx")
# b1.members = [u2]
# b1.save
