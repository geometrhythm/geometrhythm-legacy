u1 = User.where(email: "seed@geometrhythm.com")
  .first_or_create!(email: 'seed@geometrhythm.com', password_digest: '1')

u2 = User.where(email: "guest@geometrhythm.com")
  .first_or_create!(email: 'guest@geometrhythm.com', password_digest: '2')

r01 = Rhythm.where(rhythm_str: "x--x--x---x-x---").first_or_create!(creator_id: u1.id, rhythm_str: "x--x--x---x-x---")
n01 = Name.where(name: "clave son").first_or_create!(name: "clave son")
g01 = Naming.create!(rhythm_id: r01.id, name_id: n01.id, namer_id: u1.id)

r02 = Rhythm.where(rhythm_str: "x---x-x---x-x---").first_or_create!(creator_id: u1.id, rhythm_str: "x---x-x---x-x---")
n02 = Name.where(name: "shiko").first_or_create!(name: "shiko")
g02 = Naming.create!(rhythm_id: r02.id, name_id: n02.id, namer_id: u1.id)

r03 = Rhythm.where(rhythm_str: "x--x---x--x-x---").first_or_create!(creator_id: u1.id, rhythm_str: "x--x---x--x-x---")
n03 = Name.where(name: "rumba").first_or_create!(name: "rumba")
g03 = Naming.create!(rhythm_id: r03.id, name_id: n03.id, namer_id: u1.id)

r04 = Rhythm.where(rhythm_str: "x--x--x---xx----").first_or_create!(creator_id: u1.id, rhythm_str: "x--x--x---xx----")
n04 = Name.where(name: "soukous").first_or_create!(name: "soukous")
g04 = Naming.create!(rhythm_id: r04.id, name_id: n04.id, namer_id: u1.id)

r05 = Rhythm.where(rhythm_str: "x--x--x---x---x-").first_or_create!(creator_id: u1.id, rhythm_str: "x--x--x---x---x-")
n05 = Name.where(name: "gahu").first_or_create!(name: "gahu")
g05 = Naming.create!(rhythm_id: r05.id, name_id: n05.id, namer_id: u1.id)

r06 = Rhythm.where(rhythm_str: "x--x--x---x--x--").first_or_create!(creator_id: u1.id, rhythm_str: "x--x--x---x--x--")
n06 = Name.where(name: "bossa-nova").first_or_create!(name: "bossa-nova")
g06 = Naming.create!(rhythm_id: r06.id, name_id: n06.id, namer_id: u1.id)

r07 = Rhythm.where(rhythm_str: "x-xx-xx-").first_or_create!(creator_id: u1.id, rhythm_str: "x-xx-xx-")
n07 = Name.where(name: "cinquillo").first_or_create!(name: "cinquillo")
g07 = Naming.create!(rhythm_id: r07.id, name_id: n07.id, namer_id: u1.id)

r08 = Rhythm.where(rhythm_str: "x-x-x--x-x--").first_or_create!(creator_id: u1.id, rhythm_str: "x-x-x--x-x--")
n08 = Name.where(name: "fume-fume").first_or_create!(name: "fume-fume")
g08 = Naming.create!(rhythm_id: r08.id, name_id: n08.id, namer_id: u1.id)

r09 = Rhythm.where(rhythm_str: "x-x-xx-x-x-x").first_or_create!(creator_id: u1.id, rhythm_str: "x-x-xx-x-x-x")
n09 = Name.where(name: "bembé").first_or_create!(name: "bembé")
g09 = Naming.create!(rhythm_id: r09.id, name_id: n09.id, namer_id: u1.id)

r10 = Rhythm.where(rhythm_str: "x--x--x---x-x---").first_or_create!(creator_id: u1.id, rhythm_str: "x--x--x---x-x---")
n10 = Name.where(name: "kpanlogo").first_or_create!(name: "kpanlogo")
g10 = Naming.create!(rhythm_id: r10.id, name_id: n10.id, namer_id: u1.id)

r11 = Rhythm.where(rhythm_str: "xx-xx-x-").first_or_create!(creator_id: u1.id, rhythm_str: "xx-xx-x-")
n11 = Name.where(name: "timini").first_or_create!(name: "timini")
g11 = Naming.create!(rhythm_id: r11.id, name_id: n11.id, namer_id: u1.id)

r12 = Rhythm.where(rhythm_str: "xx-x-xx-").first_or_create!(creator_id: u1.id, rhythm_str: "xx-x-xx-")
n12 = Name.where(name: "kromanti").first_or_create!(name: "kromanti")
g12 = Naming.create!(rhythm_id: r12.id, name_id: n12.id, namer_id: u1.id)

r13 = Rhythm.where(rhythm_str: "x-xx-xx-x-x-x-xx").first_or_create!(creator_id: u1.id, rhythm_str: "x-xx-xx-x-x-x-xx")
n13 = Name.where(name: "wahda kebira").first_or_create!(name: "wahda kebira")
g13 = Naming.create!(rhythm_id: r13.id, name_id: n13.id, namer_id: u1.id)

r14 = Rhythm.where(rhythm_str: "xx-x-xx-x-x-x-x-").first_or_create!(creator_id: u1.id, rhythm_str: "xx-x-xx-x-x-x-x-")
n14 = Name.where(name: "kassa").first_or_create!(name: "kassa")
g14 = Naming.create!(rhythm_id: r14.id, name_id: n14.id, namer_id: u1.id)

r15 = Rhythm.where(rhythm_str: "x-x--").first_or_create!(creator_id: u1.id, rhythm_str: "x-x--")
n15 = Name.where(name: "aksak rhythm").first_or_create!(name: "aksak rhythm")
g15 = Naming.create!(rhythm_id: r15.id, name_id: n15.id, namer_id: u1.id)

r16 = Rhythm.where(rhythm_str: "x-x-x--").first_or_create!(creator_id: u1.id, rhythm_str: "x-x-x--")
n16 = Name.where(name: "aksak rhythm").first_or_create!(name: "aksak rhythm")
g16 = Naming.create!(rhythm_id: r16.id, name_id: n16.id, namer_id: u1.id)

r17 = Rhythm.where(rhythm_str: "x-x-x-x--x-x-").first_or_create!(creator_id: u1.id, rhythm_str: "x-x-x-x--x-x-")
n17 = Name.where(name: "aksak rhythm").first_or_create!(name: "aksak rhythm")
g17 = Naming.create!(rhythm_id: r17.id, name_id: n17.id, namer_id: u1.id)

r18 = Rhythm.where(rhythm_str: "x-x-x-x--").first_or_create!(creator_id: u1.id, rhythm_str: "x-x-x-x--")
n18 = Name.where(name: "quasi-aksak rhythm").first_or_create!(name: "quasi-aksak rhythm")
g18 = Naming.create!(rhythm_id: r18.id, name_id: n18.id, namer_id: u1.id)

r19 = Rhythm.where(rhythm_str: "x-x-x-x-x--x-x-").first_or_create!(creator_id: u1.id, rhythm_str: "x-x-x-x-x--x-x-")
n19 = Name.where(name: "quasi-aksak rhythm").first_or_create!(name: "quasi-aksak rhythm")
g19 = Naming.create!(rhythm_id: r19.id, name_id: n19.id, namer_id: u1.id)

r20 = Rhythm.where(rhythm_str: "x-x--x--").first_or_create!(creator_id: u1.id, rhythm_str: "x-x--x--")
n20 = Name.where(name: "pseudo-aksak rhythm").first_or_create!(name: "pseudo-aksak rhythm")
g20 = Naming.create!(rhythm_id: r20.id, name_id: n20.id, namer_id: u1.id)

r21 = Rhythm.where(rhythm_str: "x-x-x--x--").first_or_create!(creator_id: u1.id, rhythm_str: "x-x-x--x--")
n21 = Name.where(name: "pseudo-aksak rhythm").first_or_create!(name: "pseudo-aksak rhythm")
g21 = Naming.create!(rhythm_id: r21.id, name_id: n21.id, namer_id: u1.id)

r22 = Rhythm.where(rhythm_str: "x-x-x-x--x--").first_or_create!(creator_id: u1.id, rhythm_str: "x-x-x-x--x--")
n22 = Name.where(name: "pseudo-aksak rhythm").first_or_create!(name: "pseudo-aksak rhythm")
g22 = Naming.create!(rhythm_id: r22.id, name_id: n22.id, namer_id: u1.id)

r23 = Rhythm.where(rhythm_str: "x-xx-xx-xx-x").first_or_create!(creator_id: u1.id, rhythm_str: "x-xx-xx-xx-x")
n23 = Name.where(name: "pilou").first_or_create!(name: "pilou")
g23 = Naming.create!(rhythm_id: r23.id, name_id: n23.id, namer_id: u1.id)

r24 = Rhythm.where(rhythm_str: "x-x-x--x-").first_or_create!(creator_id: u1.id, rhythm_str: "x-x-x--x-")
n24 = Name.where(name: "quasi-aksak rhythm rotation 1").first_or_create!(name: "quasi-aksak rhythm rotation 1")
g24 = Naming.create!(rhythm_id: r24.id, name_id: n24.id, namer_id: u1.id)

r25 = Rhythm.where(rhythm_str: "x-x--x-x-").first_or_create!(creator_id: u1.id, rhythm_str: "x-x--x-x-")
n25 = Name.where(name: "quasi-aksak rhythm rotation 2").first_or_create!(name: "quasi-aksak rhythm rotation 2")
g25 = Naming.create!(rhythm_id: r25.id, name_id: n25.id, namer_id: u1.id)

r26 = Rhythm.where(rhythm_str: "x--x-x-x-").first_or_create!(creator_id: u1.id, rhythm_str: "x--x-x-x-")
n26 = Name.where(name: "quasi-aksak rhythm rotation 3").first_or_create!(name: "quasi-aksak rhythm rotation 3")
g26 = Naming.create!(rhythm_id: r26.id, name_id: n26.id, namer_id: u1.id)

r27 = Rhythm.where(rhythm_str: "xx-xx-x-").first_or_create!(creator_id: u1.id, rhythm_str: "xx-xx-x-")
n27 = Name.where(name: "cinquillo rotation 1").first_or_create!(name: "cinquillo rotation 1")
g27 = Naming.create!(rhythm_id: r27.id, name_id: n27.id, namer_id: u1.id)

r28 = Rhythm.where(rhythm_str: "x-xx-x-x").first_or_create!(creator_id: u1.id, rhythm_str: "x-xx-x-x")
n28 = Name.where(name: "cinquillo rotation 2").first_or_create!(name: "cinquillo rotation 2")
g28 = Naming.create!(rhythm_id: r28.id, name_id: n28.id, namer_id: u1.id)

r29 = Rhythm.where(rhythm_str: "xx-x-xx-").first_or_create!(creator_id: u1.id, rhythm_str: "xx-x-xx-")
n29 = Name.where(name: "cinquillo rotation 3").first_or_create!(name: "cinquillo rotation 3")
g29 = Naming.create!(rhythm_id: r29.id, name_id: n29.id, namer_id: u1.id)

r30 = Rhythm.where(rhythm_str: "x-x-xx-x").first_or_create!(creator_id: u1.id, rhythm_str: "x-x-xx-x")
n30 = Name.where(name: "cinquillo rotation 4").first_or_create!(name: "cinquillo rotation 4")
g30 = Naming.create!(rhythm_id: r30.id, name_id: n30.id, namer_id: u1.id)

r31 = Rhythm.where(rhythm_str: "xx-xx-x-").first_or_create!(creator_id: u1.id, rhythm_str: "xx-xx-x-")
n31 = Name.where(name: "adzogbo").first_or_create!(name: "adzogbo")
g31 = Naming.create!(rhythm_id: r31.id, name_id: n31.id, namer_id: u1.id)

r32 = Rhythm.where(rhythm_str: "xx-xx-x-").first_or_create!(creator_id: u1.id, rhythm_str: "xx-xx-x-")
n32 = Name.where(name: "tango").first_or_create!(name: "tango")
g32 = Naming.create!(rhythm_id: r32.id, name_id: n32.id, namer_id: u1.id)

r33 = Rhythm.where(rhythm_str: "xx-xx-x-").first_or_create!(creator_id: u1.id, rhythm_str: "xx-xx-x-")
n33 = Name.where(name: "maksum").first_or_create!(name: "maksum")
g33 = Naming.create!(rhythm_id: r33.id, name_id: n33.id, namer_id: u1.id)

r34 = Rhythm.where(rhythm_str: "xx-xx-x-").first_or_create!(creator_id: u1.id, rhythm_str: "xx-xx-x-")
n34 = Name.where(name: "al-saghil-al-sani").first_or_create!(name: "al-saghil-al-sani")
g34 = Naming.create!(rhythm_id: r34.id, name_id: n34.id, namer_id: u1.id)

r35 = Rhythm.where(rhythm_str: "x-xx-x-x").first_or_create!(creator_id: u1.id, rhythm_str: "x-xx-x-x")
n35 = Name.where(name: "müsem-men").first_or_create!(name: "müsem-men")
g35 = Naming.create!(rhythm_id: r35.id, name_id: n35.id, namer_id: u1.id)

r36 = Rhythm.where(rhythm_str: "x-x-xx-x").first_or_create!(creator_id: u1.id, rhythm_str: "x-x-xx-x")
n36 = Name.where(name: "lolo").first_or_create!(name: "lolo")
g36 = Naming.create!(rhythm_id: r36.id, name_id: n36.id, namer_id: u1.id)

r37 = Rhythm.where(rhythm_str: "x-x-x--x-x--").first_or_create!(creator_id: u1.id, rhythm_str: "x-x-x--x-x--")
n37 = Name.where(name: "standard short pattern").first_or_create!(name: "standard short pattern")
g37 = Naming.create!(rhythm_id: r37.id, name_id: n37.id, namer_id: u1.id)

r38 = Rhythm.where(rhythm_str: "x-x-x--x-x--").first_or_create!(creator_id: u1.id, rhythm_str: "x-x-x--x-x--")
n38 = Name.where(name: "African signature pattern").first_or_create!(name: "African signature pattern")
g38 = Naming.create!(rhythm_id: r38.id, name_id: n38.id, namer_id: u1.id)

r39 = Rhythm.where(rhythm_str: "x-x-x--x-x--").first_or_create!(creator_id: u1.id, rhythm_str: "x-x-x--x-x--")
n39 = Name.where(name: "ternary clave son").first_or_create!(name: "ternary clave son")
g39 = Naming.create!(rhythm_id: r39.id, name_id: n39.id, namer_id: u1.id)

r40 = Rhythm.where(rhythm_str: "x-x--x-x--x-").first_or_create!(creator_id: u1.id, rhythm_str: "x-x--x-x--x-")
n40 = Name.where(name: "ternary clave son rotation 1").first_or_create!(name: "ternary clave son rotation 1")
g40 = Naming.create!(rhythm_id: r40.id, name_id: n40.id, namer_id: u1.id)

r41 = Rhythm.where(rhythm_str: "x--x-x--x-x-").first_or_create!(creator_id: u1.id, rhythm_str: "x--x-x--x-x-")
n41 = Name.where(name: "ternary clave son rotation 2").first_or_create!(name: "ternary clave son rotation 2")
g41 = Naming.create!(rhythm_id: r41.id, name_id: n41.id, namer_id: u1.id)

r42 = Rhythm.where(rhythm_str: "x-x--x-x-x--").first_or_create!(creator_id: u1.id, rhythm_str: "x-x--x-x-x--")
n42 = Name.where(name: "ternary clave son rotation 3").first_or_create!(name: "ternary clave son rotation 3")
g42 = Naming.create!(rhythm_id: r42.id, name_id: n42.id, namer_id: u1.id)

r43 = Rhythm.where(rhythm_str: "x--x-x-x--x-").first_or_create!(creator_id: u1.id, rhythm_str: "x--x-x-x--x-")
n43 = Name.where(name: "ternary clave son rotation 4").first_or_create!(name: "ternary clave son rotation 4")
g43 = Naming.create!(rhythm_id: r43.id, name_id: n43.id, namer_id: u1.id)

r44 = Rhythm.where(rhythm_str: "x-x--x-x-x--").first_or_create!(creator_id: u1.id, rhythm_str: "x-x--x-x-x--")
n44 = Name.where(name: "columbia").first_or_create!(name: "columbia")
g44 = Naming.create!(rhythm_id: r44.id, name_id: n44.id, namer_id: u1.id)

r45 = Rhythm.where(rhythm_str: "xxx-").first_or_create!(creator_id: u1.id, rhythm_str: "xxx-")
n45 = Name.where(name: "baião").first_or_create!(name: "baião")
g45 = Naming.create!(rhythm_id: r45.id, name_id: n45.id, namer_id: u1.id)

r46 = Rhythm.where(rhythm_str: "xxx-").first_or_create!(creator_id: u1.id, rhythm_str: "xxx-")
n46 = Name.where(name: "polos").first_or_create!(name: "polos")
g46 = Naming.create!(rhythm_id: r46.id, name_id: n46.id, namer_id: u1.id)

r47 = Rhythm.where(rhythm_str: "xx-x").first_or_create!(creator_id: u1.id, rhythm_str: "xx-x")
n47 = Name.where(name: "catarete").first_or_create!(name: "catarete")
g47 = Naming.create!(rhythm_id: r47.id, name_id: n47.id, namer_id: u1.id)

r48 = Rhythm.where(rhythm_str: "x-xx").first_or_create!(creator_id: u1.id, rhythm_str: "x-xx")
n48 = Name.where(name: "cumbia").first_or_create!(name: "cumbia")
g48 = Naming.create!(rhythm_id: r48.id, name_id: n48.id, namer_id: u1.id)

r49 = Rhythm.where(rhythm_str: "x-xx").first_or_create!(creator_id: u1.id, rhythm_str: "x-xx")
n49 = Name.where(name: "calypso").first_or_create!(name: "calypso")
g49 = Naming.create!(rhythm_id: r49.id, name_id: n49.id, namer_id: u1.id)

r50 = Rhythm.where(rhythm_str: "x-xx").first_or_create!(creator_id: u1.id, rhythm_str: "x-xx")
n50 = Name.where(name: "khalif-e saghil").first_or_create!(name: "khalif-e saghil")
g50 = Naming.create!(rhythm_id: r50.id, name_id: n50.id, namer_id: u1.id)

r51 = Rhythm.where(rhythm_str: "x-xx").first_or_create!(creator_id: u1.id, rhythm_str: "x-xx")
n51 = Name.where(name: "trochoid choreic").first_or_create!(name: "trochoid choreic")
g51 = Naming.create!(rhythm_id: r51.id, name_id: n51.id, namer_id: u1.id)

r52 = Rhythm.where(rhythm_str: "x-x-x-x-xxx-").first_or_create!(creator_id: u1.id, rhythm_str: "x-x-x-x-xxx-")
n52 = Name.where(name: "kitāb al-Adwār").first_or_create!(name: "kitāb al-Adwār")
g52 = Naming.create!(rhythm_id: r52.id, name_id: n52.id, namer_id: u1.id)

r53 = Rhythm.where(rhythm_str: "x-xxx-x-x-x-").first_or_create!(creator_id: u1.id, rhythm_str: "x-xxx-x-x-x-")
n53 = Name.where(name: "polonaise").first_or_create!(name: "polonaise")
g53 = Naming.create!(rhythm_id: r53.id, name_id: n53.id, namer_id: u1.id)

r54 = Rhythm.where(rhythm_str: "x-x-x-x-xx-x").first_or_create!(creator_id: u1.id, rhythm_str: "x-x-x-x-xx-x")
n54 = Name.where(name: "al-ramal").first_or_create!(name: "al-ramal")
g54 = Naming.create!(rhythm_id: r54.id, name_id: n54.id, namer_id: u1.id)

r55 = Rhythm.where(rhythm_str: "--x--x--x--x--x--x--x-xx--x-----").first_or_create!(creator_id: u1.id, rhythm_str: "--x--x--x--x--x--x--x-xx--x-----")
n55 = Name.where(name: "cosmic girl").first_or_create!(name: "cosmic girl")
g55 = Naming.create!(rhythm_id: r55.id, name_id: n55.id, namer_id: u1.id)

r56 = Rhythm.where(rhythm_str: "xxxx-x-xx-x-").first_or_create!(creator_id: u1.id, rhythm_str: "xxxx-x-xx-x-")
n56 = Name.where(name: "Haak's rhythm").first_or_create!(name: "Haak's rhythm")
g56 = Naming.create!(rhythm_id: r56.id, name_id: n56.id, namer_id: u1.id)

r57 = Rhythm.where(rhythm_str: "xxx-xx-x-xx-").first_or_create!(creator_id: u1.id, rhythm_str: "xxx-xx-x-xx-")
n57 = Name.where(name: "clapping music").first_or_create!(name: "clapping music")
g57 = Naming.create!(rhythm_id: r57.id, name_id: n57.id, namer_id: u1.id)

r58 = Rhythm.where(rhythm_str: "xxx-xx-x-xx-xxx-").first_or_create!(creator_id: u1.id, rhythm_str: "xxx-xx-x-xx-xxx-")
n58 = Name.where(name: "feel good hit of the summer").first_or_create!(name: "feel good hit of the summer")
g58 = Naming.create!(rhythm_id: r58.id, name_id: n58.id, namer_id: u1.id)

r59 = Rhythm.where(rhythm_str: "x--x--x-").first_or_create!(creator_id: u1.id, rhythm_str: "x--x--x-")
n59 = Name.where(name: "tresillo").first_or_create!(name: "tresillo")
g59 = Naming.create!(rhythm_id: r59.id, name_id: n59.id, namer_id: u1.id)

r60 = Rhythm.where(rhythm_str: "x--x-x--").first_or_create!(creator_id: u1.id, rhythm_str: "x--x-x--")
n60 = Name.where(name: "Beijing opera").first_or_create!(name: "Beijing opera")
g60 = Naming.create!(rhythm_id: r60.id, name_id: n60.id, namer_id: u1.id)

r61 = Rhythm.where(rhythm_str: "x-x--x--").first_or_create!(creator_id: u1.id, rhythm_str: "x-x--x--")
n61 = Name.where(name: "nandon bawaa").first_or_create!(name: "nandon bawaa")
g61 = Naming.create!(rhythm_id: r61.id, name_id: n61.id, namer_id: u1.id)

r62 = Rhythm.where(rhythm_str: "xx--x-x-----").first_or_create!(creator_id: u1.id, rhythm_str: "xx--x-x-----")
n62 = Name.where(name: "homometric pair member, minimal-spanning, perfectly flat").first_or_create!(name: "homometric pair member, minimal-spanning, perfectly flat")
g62 = Naming.create!(rhythm_id: r62.id, name_id: n62.id, namer_id: u1.id)

r63 = Rhythm.where(rhythm_str: "xx-x---x----").first_or_create!(creator_id: u1.id, rhythm_str: "xx-x---x----")
n63 = Name.where(name: "homometric pair member, minimal-spanning, perfectly flat").first_or_create!(name: "homometric pair member, minimal-spanning, perfectly flat")
g63 = Naming.create!(rhythm_id: r63.id, name_id: n63.id, namer_id: u1.id)

r64 = Rhythm.where(rhythm_str: "--x--x--x--x---- ").first_or_create!(creator_id: u1.id, rhythm_str: "--x--x--x--x---- ")
n64 = Name.where(name: "gershwin's i got rhythm").first_or_create!(name: "gershwin's i got rhythm")
g64 = Naming.create!(rhythm_id: r64.id, name_id: n64.id, namer_id: u1.id)

r65 = Rhythm.where(rhythm_str: "x-xxx-").first_or_create!(creator_id: u1.id, rhythm_str: "x-xxx-")
n65 = Name.where(name: "nyunga-nyunga").first_or_create!(name: "nyunga-nyunga")
g65 = Naming.create!(rhythm_id: r65.id, name_id: n65.id, namer_id: u1.id)

r66 = Rhythm.where(rhythm_str: "x-x-xx").first_or_create!(creator_id: u1.id, rhythm_str: "x-x-xx")
n66 = Name.where(name: "bambuco").first_or_create!(name: "bambuco")
g66 = Naming.create!(rhythm_id: r66.id, name_id: n66.id, namer_id: u1.id)

r67 = Rhythm.where(rhythm_str: "x--x----").first_or_create!(creator_id: u1.id, rhythm_str: "x--x----")
n67 = Name.where(name: "conga").first_or_create!(name: "conga")
g67 = Naming.create!(rhythm_id: r67.id, name_id: n67.id, namer_id: u1.id)

r68 = Rhythm.where(rhythm_str: "x-x-x-xx-x-x-x--").first_or_create!(creator_id: u1.id, rhythm_str: "x-x-x-xx-x-x-x--")
n68 = Name.where(name: "triple paradittle (one hand)").first_or_create!(name: "triple paradittle (one hand)")
g68 = Naming.create!(rhythm_id: r68.id, name_id: n68.id, namer_id: u1.id)

r69 = Rhythm.where(rhythm_str: "x-x-xx-x-x--").first_or_create!(creator_id: u1.id, rhythm_str: "x-x-xx-x-x--")
n69 = Name.where(name: "double paradittle").first_or_create!(name: "double paradittle")
g69 = Naming.create!(rhythm_id: r69.id, name_id: n69.id, namer_id: u1.id)

r70 = Rhythm.where(rhythm_str: "x-xx-x--").first_or_create!(creator_id: u1.id, rhythm_str: "x-xx-x--")
n70 = Name.where(name: "paradittle").first_or_create!(name: "paradittle")
g70 = Naming.create!(rhythm_id: r70.id, name_id: n70.id, namer_id: u1.id)

r71 = Rhythm.where(rhythm_str: "x---x--x---").first_or_create!(creator_id: u1.id, rhythm_str: "x---x--x---")
n71 = Name.where(name: "balkan folk rhythm").first_or_create!(name: "balkan folk rhythm")
g71 = Naming.create!(rhythm_id: r71.id, name_id: n71.id, namer_id: u1.id)

r72 = Rhythm.where(rhythm_str: "x-x-x--").first_or_create!(creator_id: u1.id, rhythm_str: "x-x-x--")
n72 = Name.where(name: "Bulgarian easter dance").first_or_create!(name: "Bulgarian easter dance")
g72 = Naming.create!(rhythm_id: r72.id, name_id: n72.id, namer_id: u1.id)

r73 = Rhythm.where(rhythm_str: "x--x-x-").first_or_create!(creator_id: u1.id, rhythm_str: "x--x-x-")
n73 = Name.where(name: "make-donsko horo").first_or_create!(name: "make-donsko horo")
g73 = Naming.create!(rhythm_id: r73.id, name_id: n73.id, namer_id: u1.id)

r74 = Rhythm.where(rhythm_str: "x-x--").first_or_create!(creator_id: u1.id, rhythm_str: "x-x--")
n74 = Name.where(name: "khafif al-ramal").first_or_create!(name: "khafif al-ramal")
g74 = Naming.create!(rhythm_id: r74.id, name_id: n74.id, namer_id: u1.id)

r75 = Rhythm.where(rhythm_str: "x-x--").first_or_create!(creator_id: u1.id, rhythm_str: "x-x--")
n75 = Name.where(name: "or paiduska").first_or_create!(name: "or paiduska")
g75 = Naming.create!(rhythm_id: r75.id, name_id: n75.id, namer_id: u1.id)

r76 = Rhythm.where(rhythm_str: "x-x-x-x--").first_or_create!(creator_id: u1.id, rhythm_str: "x-x-x-x--")
n76 = Name.where(name: "daichovo horo").first_or_create!(name: "daichovo horo")
g76 = Naming.create!(rhythm_id: r76.id, name_id: n76.id, namer_id: u1.id)

r77 = Rhythm.where(rhythm_str: "x-xx-xx--").first_or_create!(creator_id: u1.id, rhythm_str: "x-xx-xx--")
n77 = Name.where(name: "slip jig").first_or_create!(name: "slip jig")
g77 = Naming.create!(rhythm_id: r77.id, name_id: n77.id, namer_id: u1.id)

r78 = Rhythm.where(rhythm_str: "x-xx-xx--").first_or_create!(creator_id: u1.id, rhythm_str: "x-xx-xx--")
n78 = Name.where(name: "hop jig").first_or_create!(name: "hop jig")
g78 = Naming.create!(rhythm_id: r78.id, name_id: n78.id, namer_id: u1.id)

r79 = Rhythm.where(rhythm_str: "x--x-x--x--").first_or_create!(creator_id: u1.id, rhythm_str: "x--x-x--x--")
n79 = Name.where(name: "Countdown").first_or_create!(name: "Countdown")
g79 = Naming.create!(rhythm_id: r79.id, name_id: n79.id, namer_id: u1.id)

# r80 = Rhythm.where(rhythm_str: "").first_or_create!(creator_id: u1.id, rhythm_str: "")
# n80 = Name.where(name: "").first_or_create!(name: "")
# g80 = Naming.create!(rhythm_id: r80.id, name_id: n80.id, namer_id: u1.id)

r81 = Rhythm.where(rhythm_str: "x-x-x-x--x-").first_or_create!(creator_id: u1.id, rhythm_str: "x-x-x-x--x-")
n81 = Name.where(name: "I Say a Little Prayer").first_or_create!(name: "I Say a Little Prayer")
g81 = Naming.create!(rhythm_id: r81.id, name_id: n81.id, namer_id: u1.id)

r82 = Rhythm.where(rhythm_str: "x-x-x--x-x-").first_or_create!(creator_id: u1.id, rhythm_str: "x-x-x--x-x-")
n82 = Name.where(name: "krivo horvo").first_or_create!(name: "krivo horvo")
g82 = Naming.create!(rhythm_id: r82.id, name_id: n82.id, namer_id: u1.id)

r83 = Rhythm.where(rhythm_str: "x-x--x--x-x--").first_or_create!(creator_id: u1.id, rhythm_str: "x-x--x--x-x--")
n83 = Name.where(name: "Gaze of the Church of Love").first_or_create!(name: "Gaze of the Church of Love")
g83 = Naming.create!(rhythm_id: r83.id, name_id: n83.id, namer_id: u1.id)

r84 = Rhythm.where(rhythm_str: "x--x--x-x-x--").first_or_create!(creator_id: u1.id, rhythm_str: "x--x--x-x-x--")
n84 = Name.where(name: "Connection").first_or_create!(name: "Connection")
g84 = Naming.create!(rhythm_id: r84.id, name_id: n84.id, namer_id: u1.id)

r85 = Rhythm.where(rhythm_str: "x-x-x-x--x-x-").first_or_create!(creator_id: u1.id, rhythm_str: "x-x-x-x--x-x-")
n85 = Name.where(name: "krivo plovdivsko horo").first_or_create!(name: "krivo plovdivsko horo")
g85 = Naming.create!(rhythm_id: r85.id, name_id: n85.id, namer_id: u1.id)

r86 = Rhythm.where(rhythm_str: "x--x--x-x-x-xx-x-x-").first_or_create!(creator_id: u1.id, rhythm_str: "x--x--x-x-x-xx-x-x-")
n86 = Name.where(name: "How's this for openers?").first_or_create!(name: "How's this for openers?")
g86 = Naming.create!(rhythm_id: r86.id, name_id: n86.id, namer_id: u1.id)

r87 = Rhythm.where(rhythm_str: "x-x-x--x-x--x-x-x--x-x-x-").first_or_create!(creator_id: u1.id, rhythm_str: "x-x-x--x-x--x-x-x--x-x-x-")
n87 = Name.where(name: "How's this for openers?").first_or_create!(name: "How's this for openers?")
g87 = Naming.create!(rhythm_id: r87.id, name_id: n87.id, namer_id: u1.id)

r88 = Rhythm.where(rhythm_str: "x---x----x-xx---").first_or_create!(creator_id: u1.id, rhythm_str: "x---x----x-xx---")
n88 = Name.where(name: "syncopated mùyú").first_or_create!(name: "syncopated mùyú")
g88 = Naming.create!(rhythm_id: r88.id, name_id: n88.id, namer_id: u1.id)

r89 = Rhythm.where(rhythm_str: "--x--x-x-x-x").first_or_create!(creator_id: u1.id, rhythm_str: "--x--x-x-x-x")
n89 = Name.where(name: "soleá").first_or_create!(name: "soleá")
g89 = Naming.create!(rhythm_id: r89.id, name_id: n89.id, namer_id: u1.id)

r90 = Rhythm.where(rhythm_str: "--x---xx-x-x").first_or_create!(creator_id: u1.id, rhythm_str: "--x---xx-x-x")
n90 = Name.where(name: "bulería").first_or_create!(name: "bulería")
g90 = Naming.create!(rhythm_id: r90.id, name_id: n90.id, namer_id: u1.id)

r91 = Rhythm.where(rhythm_str: "x-x-x--x--x-").first_or_create!(creator_id: u1.id, rhythm_str: "x-x-x--x--x-")
n91 = Name.where(name: "seguiriya compás").first_or_create!(name: "seguiriya compás")
g91 = Naming.create!(rhythm_id: r91.id, name_id: n91.id, namer_id: u1.id)

r92 = Rhythm.where(rhythm_str: "x--x--x--x--").first_or_create!(creator_id: u1.id, rhythm_str: "x--x--x--x--")
n92 = Name.where(name: "fandango").first_or_create!(name: "fandango")
g92 = Naming.create!(rhythm_id: r92.id, name_id: n92.id, namer_id: u1.id)

r93 = Rhythm.where(rhythm_str: "x--x--x-x-x-").first_or_create!(creator_id: u1.id, rhythm_str: "x--x--x-x-x-")
n93 = Name.where(name: "guajira").first_or_create!(name: "guajira")
g93 = Naming.create!(rhythm_id: r93.id, name_id: n93.id, namer_id: u1.id)

r94 = Rhythm.where(rhythm_str: "x--x--x-x-x-").first_or_create!(creator_id: u1.id, rhythm_str: "x--x--x-x-x-")
n94 = Name.where(name: "abakkabuk").first_or_create!(name: "abakkabuk")
g94 = Naming.create!(rhythm_id: r94.id, name_id: n94.id, namer_id: u1.id)

r95 = Rhythm.where(rhythm_str: "x---x---x--x-x--").first_or_create!(creator_id: u1.id, rhythm_str: "x---x---x--x-x--")
n95 = Name.where(name: "kpatsa").first_or_create!(name: "kpatsa")
g95 = Naming.create!(rhythm_id: r95.id, name_id: n95.id, namer_id: u1.id)

r96 = Rhythm.where(rhythm_str: "x---x--x--x-").first_or_create!(creator_id: u1.id, rhythm_str: "x---x--x--x-")
n96 = Name.where(name: "al-hazaj").first_or_create!(name: "al-hazaj")
g96 = Naming.create!(rhythm_id: r96.id, name_id: n96.id, namer_id: u1.id)

r97 = Rhythm.where(rhythm_str: "x---x---x---x---").first_or_create!(creator_id: u1.id, rhythm_str: "x---x---x---x---")
n97 = Name.where(name: "tintal").first_or_create!(name: "tintal")
g97 = Naming.create!(rhythm_id: r97.id, name_id: n97.id, namer_id: u1.id)

r98 = Rhythm.where(rhythm_str: "x---x---x---x---").first_or_create!(creator_id: u1.id, rhythm_str: "x---x---x---x---")
n98 = Name.where(name: "tilwada").first_or_create!(name: "tilwada")
g98 = Naming.create!(rhythm_id: r98.id, name_id: n98.id, namer_id: u1.id)

r99 = Rhythm.where(rhythm_str: "x--x--x-x--x--x-").first_or_create!(creator_id: u1.id, rhythm_str: "x--x--x-x--x--x-")
n99 = Name.where(name: "sitarkhani").first_or_create!(name: "sitarkhani")
g99 = Naming.create!(rhythm_id: r99.id, name_id: n99.id, namer_id: u1.id)

r100 = Rhythm.where(rhythm_str: "x--x--").first_or_create!(creator_id: u1.id, rhythm_str: "x--x--")
n100 = Name.where(name: "dadra").first_or_create!(name: "dadra")
g100 = Naming.create!(rhythm_id: r100.id, name_id: n100.id, namer_id: u1.id)

r101 = Rhythm.where(rhythm_str: "x--x-x-").first_or_create!(creator_id: u1.id, rhythm_str: "x--x-x-")
n101 = Name.where(name: "pashtu").first_or_create!(name: "pashtu")
g101 = Naming.create!(rhythm_id: r101.id, name_id: n101.id, namer_id: u1.id)

r102 = Rhythm.where(rhythm_str: "x---x---").first_or_create!(creator_id: u1.id, rhythm_str: "x---x---")
n102 = Name.where(name: "kaherava").first_or_create!(name: "kaherava")
g102 = Naming.create!(rhythm_id: r102.id, name_id: n102.id, namer_id: u1.id)

r103 = Rhythm.where(rhythm_str: "x--x-x-").first_or_create!(creator_id: u1.id, rhythm_str: "x--x-x-")
n103 = Name.where(name: "rupak").first_or_create!(name: "rupak")
g103 = Naming.create!(rhythm_id: r103.id, name_id: n103.id, namer_id: u1.id)

r104 = Rhythm.where(rhythm_str: "x-x--x-x--").first_or_create!(creator_id: u1.id, rhythm_str: "x-x--x-x--")
n104 = Name.where(name: "jhaptal").first_or_create!(name: "jhaptal")
g104 = Naming.create!(rhythm_id: r104.id, name_id: n104.id, namer_id: u1.id)

r105 = Rhythm.where(rhythm_str: "x-x-x-x-x-x-").first_or_create!(creator_id: u1.id, rhythm_str: "x-x-x-x-x-x-")
n105 = Name.where(name: "ektal").first_or_create!(name: "ektal")
g105 = Naming.create!(rhythm_id: r105.id, name_id: n105.id, namer_id: u1.id)

r106 = Rhythm.where(rhythm_str: "x--x---x--x---").first_or_create!(creator_id: u1.id, rhythm_str: "x--x---x--x---")
n106 = Name.where(name: "charchar").first_or_create!(name: "charchar")
g106 = Naming.create!(rhythm_id: r106.id, name_id: n106.id, namer_id: u1.id)

r107 = Rhythm.where(rhythm_str: "x--x---x--x---").first_or_create!(creator_id: u1.id, rhythm_str: "x--x---x--x---")
n107 = Name.where(name: "dipchandi").first_or_create!(name: "dipchandi")
g107 = Naming.create!(rhythm_id: r107.id, name_id: n107.id, namer_id: u1.id)

r108 = Rhythm.where(rhythm_str: "x--x---x--x---").first_or_create!(creator_id: u1.id, rhythm_str: "x--x---x--x---")
n108 = Name.where(name: "jhoomra").first_or_create!(name: "jhoomra")
g108 = Naming.create!(rhythm_id: r108.id, name_id: n108.id, namer_id: u1.id)

r109 = Rhythm.where(rhythm_str: "x----x-x--x---").first_or_create!(creator_id: u1.id, rhythm_str: "x----x-x--x---")
n109 = Name.where(name: "dhammar").first_or_create!(name: "dhammar")
g109 = Naming.create!(rhythm_id: r109.id, name_id: n109.id, namer_id: u1.id)

r110 = Rhythm.where(rhythm_str: "x---x---x-x-").first_or_create!(creator_id: u1.id, rhythm_str: "x---x---x-x-")
n110 = Name.where(name: "chautal").first_or_create!(name: "chautal")
g110 = Naming.create!(rhythm_id: r110.id, name_id: n110.id, namer_id: u1.id)

r111 = Rhythm.where(rhythm_str: "x--x-x-").first_or_create!(creator_id: u1.id, rhythm_str: "x--x-x-")
n111 = Name.where(name: "tivra").first_or_create!(name: "tivra")
g111 = Naming.create!(rhythm_id: r111.id, name_id: n111.id, namer_id: u1.id)

r112 = Rhythm.where(rhythm_str: "x-x-x-x-x-").first_or_create!(creator_id: u1.id, rhythm_str: "x-x-x-x-x-")
n112 = Name.where(name: "sultal").first_or_create!(name: "sultal")
g112 = Naming.create!(rhythm_id: r112.id, name_id: n112.id, namer_id: u1.id)

r113 = Rhythm.where(rhythm_str: "x--x--x-x---x---").first_or_create!(creator_id: u1.id, rhythm_str: "x--x--x-x---x---")
# n113 = Name.where(name: "").first_or_create!(name: "")
# g113 = Naming.create!(rhythm_id: r113.id, name_id: n113.id, namer_id: u1.id)

r114 = Rhythm.where(rhythm_str: "x--x-x--x---x---").first_or_create!(creator_id: u1.id, rhythm_str: "x--x-x--x---x---")
n114 = Name.where(name: "rap rotation").first_or_create!(name: "rap rotation")
g114 = Naming.create!(rhythm_id: r114.id, name_id: n114.id, namer_id: u1.id)

r115 = Rhythm.where(rhythm_str: "x-x--x--x---x---").first_or_create!(creator_id: u1.id, rhythm_str: "x-x--x--x---x---")
n115 = Name.where(name: "gahu rotation").first_or_create!(name: "gahu rotation")
g115 = Naming.create!(rhythm_id: r115.id, name_id: n115.id, namer_id: u1.id)

r116 = Rhythm.where(rhythm_str: "x-x--x---x---x--").first_or_create!(creator_id: u1.id, rhythm_str: "x-x--x---x---x--")
n116 = Name.where(name: "rap rotation").first_or_create!(name: "rap rotation")
g116 = Naming.create!(rhythm_id: r116.id, name_id: n116.id, namer_id: u1.id)

r117 = Rhythm.where(rhythm_str: "x--x-x---x---x--").first_or_create!(creator_id: u1.id, rhythm_str: "x--x-x---x---x--")
# n117 = Name.where(name: "").first_or_create!(name: "")
# g117 = Naming.create!(rhythm_id: r117.id, name_id: n117.id, namer_id: u1.id)

r118 = Rhythm.where(rhythm_str: "x--x---x-x---x--").first_or_create!(creator_id: u1.id, rhythm_str: "x--x---x-x---x--")
n118 = Name.where(name: "son rotation").first_or_create!(name: "son rotation")
g118 = Naming.create!(rhythm_id: r118.id, name_id: n118.id, namer_id: u1.id)

r119 = Rhythm.where(rhythm_str: "x--x---x---x-x--").first_or_create!(creator_id: u1.id, rhythm_str: "x--x---x---x-x--")
n119 = Name.where(name: "gahu rotation").first_or_create!(name: "gahu rotation")
g119 = Naming.create!(rhythm_id: r119.id, name_id: n119.id, namer_id: u1.id)

r120 = Rhythm.where(rhythm_str: "x--x---x---x--x-").first_or_create!(creator_id: u1.id, rhythm_str: "x--x---x---x--x-")
n120 = Name.where(name: "rap rotation").first_or_create!(name: "rap rotation")
g120 = Naming.create!(rhythm_id: r120.id, name_id: n120.id, namer_id: u1.id)

r121 = Rhythm.where(rhythm_str: "x--x---x--x---x-").first_or_create!(creator_id: u1.id, rhythm_str: "x--x---x--x---x-")
# n121 = Name.where(name: "").first_or_create!(name: "")
# g121 = Naming.create!(rhythm_id: r121.id, name_id: n121.id, namer_id: u1.id)

r122 = Rhythm.where(rhythm_str: "x--x---x-x--x---").first_or_create!(creator_id: u1.id, rhythm_str: "x--x---x-x--x---")
# n122 = Name.where(name: "").first_or_create!(name: "")
# g122 = Naming.create!(rhythm_id: r122.id, name_id: n122.id, namer_id: u1.id)

r123 = Rhythm.where(rhythm_str: "x--x-x---x--x---").first_or_create!(creator_id: u1.id, rhythm_str: "x--x-x---x--x---")
n123 = Name.where(name: "rumba rotation").first_or_create!(name: "rumba rotation")
g123 = Naming.create!(rhythm_id: r123.id, name_id: n123.id, namer_id: u1.id)

r124 = Rhythm.where(rhythm_str: "x-x--x---x--x---").first_or_create!(creator_id: u1.id, rhythm_str: "x-x--x---x--x---")
# n124 = Name.where(name: "").first_or_create!(name: "")
# g124 = Naming.create!(rhythm_id: r124.id, name_id: n124.id, namer_id: u1.id)

r125 = Rhythm.where(rhythm_str: "x-x---x--x--x---").first_or_create!(creator_id: u1.id, rhythm_str: "x-x---x--x--x---")
n125 = Name.where(name: "son rotation").first_or_create!(name: "son rotation")
g125 = Naming.create!(rhythm_id: r125.id, name_id: n125.id, namer_id: u1.id)

r126 = Rhythm.where(rhythm_str: "x---x-x--x--x---").first_or_create!(creator_id: u1.id, rhythm_str: "x---x-x--x--x---")
n126 = Name.where(name: "gahu rotation").first_or_create!(name: "gahu rotation")
g126 = Naming.create!(rhythm_id: r126.id, name_id: n126.id, namer_id: u1.id)

r127 = Rhythm.where(rhythm_str: "x---x--x-x--x---").first_or_create!(creator_id: u1.id, rhythm_str: "x---x--x-x--x---")
n127 = Name.where(name: "rap").first_or_create!(name: "rap")
g127 = Naming.create!(rhythm_id: r127.id, name_id: n127.id, namer_id: u1.id)

r128 = Rhythm.where(rhythm_str: "x---x--x--x-x---").first_or_create!(creator_id: u1.id, rhythm_str: "x---x--x--x-x---")
# n128 = Name.where(name: "").first_or_create!(name: "")
# g128 = Naming.create!(rhythm_id: r128.id, name_id: n128.id, namer_id: u1.id)

r129 = Rhythm.where(rhythm_str: "x---x--x--x---x-").first_or_create!(creator_id: u1.id, rhythm_str: "x---x--x--x---x-")
n129 = Name.where(name: "son rotation").first_or_create!(name: "son rotation")
g129 = Naming.create!(rhythm_id: r129.id, name_id: n129.id, namer_id: u1.id)

r130 = Rhythm.where(rhythm_str: "x---x--x---x--x-").first_or_create!(creator_id: u1.id, rhythm_str: "x---x--x---x--x-")
n130 = Name.where(name: "rumba rotation").first_or_create!(name: "rumba rotation")
g130 = Naming.create!(rhythm_id: r130.id, name_id: n130.id, namer_id: u1.id)

r131 = Rhythm.where(rhythm_str: "x---x--x---x-x--").first_or_create!(creator_id: u1.id, rhythm_str: "x---x--x---x-x--")
# n131 = Name.where(name: "").first_or_create!(name: "")
# g131 = Naming.create!(rhythm_id: r131.id, name_id: n131.id, namer_id: u1.id)

r132 = Rhythm.where(rhythm_str: "x---x-x--x---x--").first_or_create!(creator_id: u1.id, rhythm_str: "x---x-x--x---x--")
# n132 = Name.where(name: "").first_or_create!(name: "")
# g132 = Naming.create!(rhythm_id: r132.id, name_id: n132.id, namer_id: u1.id)

r133 = Rhythm.where(rhythm_str: "x-x---x---x--x--").first_or_create!(creator_id: u1.id, rhythm_str: "x-x---x---x--x--")
# n133 = Name.where(name: "").first_or_create!(name: "")
# g133 = Naming.create!(rhythm_id: r133.id, name_id: n133.id, namer_id: u1.id)

r134 = Rhythm.where(rhythm_str: "x---x---x--x--x-").first_or_create!(creator_id: u1.id, rhythm_str: "x---x---x--x--x-")
# n134 = Name.where(name: "").first_or_create!(name: "")
# g134 = Naming.create!(rhythm_id: r134.id, name_id: n134.id, namer_id: u1.id)

r135 = Rhythm.where(rhythm_str: "x---x--x-x---x--").first_or_create!(creator_id: u1.id, rhythm_str: "x---x--x-x---x--")
n135 = Name.where(name: "rumba rotation").first_or_create!(name: "rumba rotation")
g135 = Naming.create!(rhythm_id: r135.id, name_id: n135.id, namer_id: u1.id)

r136 = Rhythm.where(rhythm_str: "x-x---x--x---x--").first_or_create!(creator_id: u1.id, rhythm_str: "x-x---x--x---x--")
n136 = Name.where(name: "rumba rotation").first_or_create!(name: "rumba rotation")
g136 = Naming.create!(rhythm_id: r136.id, name_id: n136.id, namer_id: u1.id)

r137 = Rhythm.where(rhythm_str: "x---x-x---x--x--").first_or_create!(creator_id: u1.id, rhythm_str: "x---x-x---x--x--")
n137 = Name.where(name: "son rotation").first_or_create!(name: "son rotation")
g137 = Naming.create!(rhythm_id: r137.id, name_id: n137.id, namer_id: u1.id)

r135 = Rhythm.where(rhythm_str: "x---x---x-x--x--").first_or_create!(creator_id: u1.id, rhythm_str: "x---x---x-x--x--")
n135 = Name.where(name: "gahu rotation").first_or_create!(name: "gahu rotation")
g135 = Naming.create!(rhythm_id: r135.id, name_id: n135.id, namer_id: u1.id)

r136 = Rhythm.where(rhythm_str: "x---x---x--x-x--").first_or_create!(creator_id: u1.id, rhythm_str: "x---x---x--x-x--")
n136 = Name.where(name: "rap rotation").first_or_create!(name: "rap rotation")
g136 = Naming.create!(rhythm_id: r136.id, name_id: n136.id, namer_id: u1.id)

r137 = Rhythm.where(rhythm_str: "x--x----").first_or_create!(creator_id: u1.id, rhythm_str: "x--x----")
n137 = Name.where(name: "charleston").first_or_create!(name: "charleston")
g137 = Naming.create!(rhythm_id: r137.id, name_id: n137.id, namer_id: u1.id)

r138 = Rhythm.where(rhythm_str: "x--x--x--x---x--").first_or_create!(creator_id: u1.id, rhythm_str: "x--x--x--x---x--")
n138 = Name.where(name: "bossa-nova variant").first_or_create!(name: "bossa-nova variant")
g138 = Naming.create!(rhythm_id: r138.id, name_id: n138.id, namer_id: u1.id)

r139 = Rhythm.where(rhythm_str: "x--x-x--x-x-").first_or_create!(creator_id: u1.id, rhythm_str: "x--x-x--x-x-")
n139 = Name.where(name: "aka pygmies").first_or_create!(name: "aka pygmies")
g139 = Naming.create!(rhythm_id: r139.id, name_id: n139.id, namer_id: u1.id)

r140 = Rhythm.where(rhythm_str: "x--x-x-x--x-").first_or_create!(creator_id: u1.id, rhythm_str: "x--x-x-x--x-")
n140 = Name.where(name: "bemba").first_or_create!(name: "bemba")
g140 = Naming.create!(rhythm_id: r140.id, name_id: n140.id, namer_id: u1.id)

r141 = Rhythm.where(rhythm_str: "x--x-x-x-x--").first_or_create!(creator_id: u1.id, rhythm_str: "x--x-x-x-x--")
n141 = Name.where(name: "ewe rotation").first_or_create!(name: "ewe rotation")
g141 = Naming.create!(rhythm_id: r141.id, name_id: n141.id, namer_id: u1.id)

r142 = Rhythm.where(rhythm_str: "x-x--x-x--x-").first_or_create!(creator_id: u1.id, rhythm_str: "x-x--x-x--x-")
n142 = Name.where(name: "salve").first_or_create!(name: "salve")
g142 = Naming.create!(rhythm_id: r142.id, name_id: n142.id, namer_id: u1.id)

r143 = Rhythm.where(rhythm_str: "xx-x--x-x--x-").first_or_create!(creator_id: u1.id, rhythm_str: "xx-x--x-x--x-")
n143 = Name.where(name: "whirlpool song").first_or_create!(name: "whirlpool song")
g143 = Naming.create!(rhythm_id: r143.id, name_id: n143.id, namer_id: u1.id)

r144 = Rhythm.where(rhythm_str: "x-xx-x-xx-xxx-x-xxx-").first_or_create!(creator_id: u1.id, rhythm_str: "x-xx-x-xx-xxx-x-xxx-")
n144 = Name.where(name: "golden grudge").first_or_create!(name: "golden grudge")
g144 = Naming.create!(rhythm_id: r144.id, name_id: n144.id, namer_id: u1.id)

r145 = Rhythm.where(rhythm_str: "x--x-x--x--x---x-x-").first_or_create!(creator_id: u1.id, rhythm_str: "x--x-x--x--x---x-x-")
n145 = Name.where(name: "procrastination").first_or_create!(name: "procrastination")
g145 = Naming.create!(rhythm_id: r145.id, name_id: n145.id, namer_id: u1.id)

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
  output = {}
  (0...length).each do |rotation|
    (2...length).each do |num_onsets|
      next if length % num_onsets == 0
      if rotation == 0
        output["Euclidean Algorithm e(#{num_onsets}/#{length})"] =
          euclid_rhythm(num_onsets, length)
      else
        output["Euclidean Algorithm e(#{num_onsets}/#{length}) rotation #{rotation}"] =
          rotate(euclid_rhythm(num_onsets, length), rotation)
      end
    end
  end

  output
end

def rotate(rhythm_str, amount)
  len = rhythm_str.length
  rhythm_str[(len - amount)...len] + rhythm_str[0...(len - amount)]
end

[6, 8, 12, 16, 24].each do |length|
  euclid_rhythms_of_length(length).each do |e_r_o_l_name, e_r_o_l|
    r = Rhythm.where(rhythm_str: e_r_o_l).first_or_create!(creator_id: u1.id, rhythm_str: e_r_o_l)
    n = Name.where(name: e_r_o_l_name).first_or_create!(name: e_r_o_l_name)
    g = Naming.create!(rhythm_id: r.id, name_id: n.id, namer_id: u1.id)
  end
end

def hop_and_jump_rhythm(num_pulses, num_hops, hop_size)
  new_rhythm = "-"*num_pulses
  try_next_index = 0
  (0...num_hops).each do |hop_i|
    first_try_index = try_next_index
    success = false
    lapped = false
    until success || (first_try_index == try_next_index && lapped)
      if new_rhythm[try_next_index] != "x" &&
        seed_antipode(new_rhythm, try_next_index) == "-"
        new_rhythm[try_next_index] = "x"
        success = true
      else
        try_next_index += 1
        try_next_index = try_next_index % num_pulses
      end
      lapped = true if try_next_index == num_pulses - 1
    end
    return nil unless success
    try_next_index += hop_size
    try_next_index = try_next_index % num_pulses
  end

  new_rhythm
end

def seed_antipode(rhythm_str, index)
  rhythm_str[(index + (rhythm_str.length / 2)) % rhythm_str.length]
end

def hop_and_jump_rhythms(num_pulses)
  output  = []
  (2...num_pulses-1).each do |hop_size| #exclude trivial cases
    i = 2
    while true
      new_rhythm = hop_and_jump_rhythm(num_pulses, i, hop_size)
      break if new_rhythm.nil?
      output << [new_rhythm, "hop and jump rhythm (length: #{num_pulses}, hop size: #{hop_size}, hop count: #{i})"]
      i = i + 1
    end
  end

  output
end

[6, 8, 12, 16, 24].each do |length|
  hop_and_jump_rhythms(length).each do |h_a_j_r|
    r = Rhythm.where(rhythm_str: h_a_j_r[0]).first_or_create!(creator_id: u1.id, rhythm_str: h_a_j_r[0])
    n = Name.where(name: h_a_j_r[1]).first_or_create!(name: h_a_j_r[1])
    g = Naming.create!(rhythm_id: r.id, name_id: n.id, namer_id: u1.id)
  end
end

def maximally_even_rhythms(num_onsets, num_pulses)
  perfectly_even_division = num_pulses / num_onsets.to_f
  anchor = 0.0
  output = []
  until anchor >= perfectly_even_division

    maximally_even_marks = []
    perfectly_even_marks = []
    i = anchor
    while i <= num_pulses
      maximally_even_marks << i.round % num_pulses
      perfectly_even_marks << i % num_pulses
      i += perfectly_even_division
    end

    unless output.include?(maximally_even_marks.uniq.sort)
      output << maximally_even_marks.uniq.sort
    end

    increment = num_pulses
    perfectly_even_marks.each do |perfectly_even_mark|
      maybe_smaller_increment = perfectly_even_mark.ceil - perfectly_even_mark
      next if maybe_smaller_increment == 0
      increment = maybe_smaller_increment if maybe_smaller_increment < increment
    end
    anchor += increment.to_f

  end

  output
end

def rhythm_stringify(e_r, length)
  output = "-"*length
  e_r.each { |index| output[index] = "x" }

  output
end

[6, 8, 12, 16, 24].each do |length|
  (2...length).each do |num_onsets|
    maximally_even_rhythms(num_onsets, length).each do |m_e_r|
      rhythm_str = rhythm_stringify(m_e_r, length)
      r = Rhythm.where(rhythm_str: rhythm_str).first_or_create!(creator_id: u1.id, rhythm_str: rhythm_str)
      n = Name.where(name: "maximally even rhythm #{num_onsets}/#{length}").first_or_create!(name: "maximally even rhythm #{num_onsets}/#{length}")
      g = Naming.create!(rhythm_id: r.id, name_id: n.id, namer_id: u1.id)
    end
  end
end

def almost_maximally_even_rhythms(num_onsets, num_pulses)
  perfectly_even_division = num_pulses / num_onsets.to_f
  anchor = 0.0
  output = []
  until anchor >= perfectly_even_division
    almost_maximally_even_rhythms = [[]]
    perfectly_even_marks = []
    i = anchor
    while i < num_pulses
      new_rhythms = []
      almost_maximally_even_rhythms.each do |a_m_e_r|
        if i.floor == i
          low = a_m_e_r.dup
          next_low = i - 1
          next_low += num_pulses if next_low < 0
          low << next_low
          new_rhythms << low

          high = a_m_e_r.dup
          next_high = i + 1
          next_high -= num_pulses if next_high >= num_pulses
          high << next_high
          new_rhythms << high
        else
          low = a_m_e_r.dup
          low << i.floor
          new_rhythms << low

          high = a_m_e_r.dup
          next_high = i.ceil
          next_high -= num_pulses if next_high >= num_pulses
          high << next_high
          new_rhythms << high
        end
      end
      almost_maximally_even_rhythms = new_rhythms.dup
      perfectly_even_marks << i % num_pulses
      i += perfectly_even_division
    end
    increment = num_pulses
    perfectly_even_marks.each do |perfectly_even_mark|
      maybe_smaller_increment = perfectly_even_mark.ceil - perfectly_even_mark
      next if maybe_smaller_increment == 0
      increment = maybe_smaller_increment if maybe_smaller_increment < increment
    end
    anchor += increment.to_f
    output += almost_maximally_even_rhythms
  end
  output = output.uniq
  output.map { |r| r.uniq.sort }
end

def fctrs(n)
  output = []
  (2..n).each do |i|
    output << i if n % i == 0
  end

  output
end

def desirable_lesser_relative_primes(n)
  output = []
  (2...n-1).each do |i|
    output << i unless fctrs(i).any? { |fctr| fctrs(n).include?(fctr) }
  end

  output
end

def deep_rhythms(num_pulses)
  deep_rhythms = []
  num_pulses
  desirable_lesser_relative_primes(num_pulses).each do |d_l_r_p|
    new_rhythm = "-"*num_pulses
    (0...num_pulses - 1).each do |i|
      j = (i * d_l_r_p) % num_pulses
      new_rhythm[j] = "x"
      unless deep_rhythms.include?([new_rhythm, d_l_r_p, num_pulses, i + 1])
        deep_rhythms << [new_rhythm.dup, d_l_r_p, num_pulses, i + 1]
      end
    end
  end

  deep_rhythms
end

[6, 8, 12, 16, 24].each do |length|
  (0...length).each do |rotation|
    deep_rhythms(length).each do |deep_rhythm|
      r = Rhythm.where(rhythm_str: rotate(deep_rhythm[0], rotation)).first_or_create!(creator_id: u1.id, rhythm_str: rotate(deep_rhythm[0], rotation))
      n = Name.where(name: "deep rhythm (#{deep_rhythm[1]}:#{deep_rhythm[2]}), iteration #{deep_rhythm[3]}, rotation #{rotation}").first_or_create!(name: "deep rhythm (#{deep_rhythm[1]}:#{deep_rhythm[2]}), iteration #{deep_rhythm[3]}, rotation #{rotation}")
      g = Naming.create!(rhythm_id: r.id, name_id: n.id, namer_id: u1.id)
    end
  end
end

def toggle_rhythms
  output = []
  rhythm_str = "x--x"
  i = 0
  until rhythm_str.length > 32
    rhythm_str = "x-" + rhythm_str[0...-2] + "-x--"
    output << [rhythm_str, "toggle rhythm iteration #{i}"]
    i = i + 1
  end

  rotated_rhythms = []
  output.each do |rhythm|
    p rhythm
    (1..rhythm[0].length).each do |rotation|
      p rotation
      rotated_rhythms << [rotate(rhythm[0], rotation),
                  rhythm[1] + " rotation #{rotation}"]
    end
  end

  output + rotated_rhythms
end

def sharp_toggle_rhythms
  rhythm_str = "x-x-xx-x"
  output = [
    ["-xx-", "sharp toggle rhythm iteration 0"],
    [rhythm_str, "sharp toggle rhythm iteration 1"]
  ]
  i = 2
  until rhythm_str.length > 32
    rhythm_str = "x-" + rhythm_str + "-x"
    output << [rhythm_str, "sharp toggle rhythm iteration #{i}"]
    i = i + 1
  end

  rotated_rhythms = []
  output.each do |rhythm|
    (1..rhythm[0].length).each do |rotation|
      rotated_rhythms << [rotate(rhythm[0], rotation),
                  rhythm[1] + " rotation #{rotation}"]
    end
  end

  output + rotated_rhythms
end

toggle_rhythms.each do |rhythm|
  r = Rhythm.where(rhythm_str: rhythm[0]).first_or_create!(creator_id: u1.id, rhythm_str: rhythm[0])
  n = Name.where(name: rhythm[1]).first_or_create!(name: rhythm[1])
  g = Naming.create!(rhythm_id: r.id, name_id: n.id, namer_id: u1.id)
end

sharp_toggle_rhythms.each do |rhythm|
  r = Rhythm.where(rhythm_str: rhythm[0]).first_or_create!(creator_id: u1.id, rhythm_str: rhythm[0])
  n = Name.where(name: rhythm[1]).first_or_create!(name: rhythm[1])
  g = Naming.create!(rhythm_id: r.id, name_id: n.id, namer_id: u1.id)
end

# a_m_e_r_id = 0
# [6, 8, 12, 16, 24].each do |length|
#   (2...length).each do |num_onsets|
#     almost_maximally_even_rhythms(num_onsets, length).each do |a_m_e_r|
#       rhythm_str = rhythm_stringify(a_m_e_r, length)
#       # p a_m_e_r_id
#       a_m_e_r_id = a_m_e_r_id + 1
#       # p rhythm_str
#       r = Rhythm.where(rhythm_str: rhythm_str).first_or_create!(creator_id: u1.id, rhythm_str: rhythm_str)
#       n = Name.where(name: "almost maximally even rhythm #{num_onsets}/#{length} ##{a_m_e_r_id}").first_or_create!(name: "almost maximally even rhythm #{num_onsets}/#{length} ##{a_m_e_r_id}")
#       g = Naming.create!(rhythm_id: r.id, name_id: n.id, namer_id: u1.id)
#     end
#   end
# end
