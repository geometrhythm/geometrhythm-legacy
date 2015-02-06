# paginate @rhythms

# json.array! @rhythms do |rhythm|
#   json.partial! 'rhythm', rhythm: rhythm
# end

json.models do
  json.array! models do |model|
    json.partial! 'rhythm', rhythm: model
  end
end

json.page_number page_number
json.total_pages total_pages
