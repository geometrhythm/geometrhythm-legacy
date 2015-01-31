# Schema Information

## rhythm
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
creator_id  | integer   | not null, foreign key (references users)
play_count  | integer   | not null

## like
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
rhythm_id   | integer   | not null, foreign key (references rhythm)
liker_id    | integer   | not null, foreign key (references users)

## comment
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
body        | string    | not null
rhythm_id   | integer   | not null, foreign key (references rhythm)
user_id     | integer   | not null, foreign key (references user)

## tag
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
label       | string    | not null, unique

## tagging
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
tag_id      | integer   | not null, foreign key (references tag)
tagger_id   | integer   | not null, foreign key (references user)
rhythm_id   | integer   | not null, foreign key (references rhythm)

## name
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
name        | string    | not null

## naming
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
name_id     | integer   | not null, foreign key (references name)
namer_id    | integer   | not null, foreign key (references user)
rhythm_id   | integer   | not null, foreign key (references rhythm)

## user
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
email           | string    | not null, unique
password_digest | string    | not null
session_token   | string    | not null, unique
