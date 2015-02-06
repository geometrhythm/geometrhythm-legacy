# paginate @rhythms

json.array! @rhythms do |rhythm|
  json.partial! 'rhythm', rhythm: rhythm
end


# format.json do
#   render :json => {
#     models: @dogs,
#     page_number: params[:page],
#     total_pages: @dogs.total_pages
#   }
# end
