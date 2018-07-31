setup:
	gem install bundle rails; bundle install; rake db:setup assets:precompile

start:
	rails server

deploy:
	cf push
