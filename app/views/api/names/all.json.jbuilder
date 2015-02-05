json.array! @names do |name|
  json.partial! 'name', name: name
end
