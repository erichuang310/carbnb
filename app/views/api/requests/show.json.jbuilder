Jbuilder.new do
  json.(
    @car_listing,
    :id,
    :leaser_id,
    :title,
    :description,
    :rate,
    :deposit,
    :cancellation,
    :active,
    :car_year,
    :car_make,
    :car_model,
    :car_color,
    :address,
    :latitude,
    :longitude
  )
  json.imageUrls @car_listing.images.pluck(:file_picker_url)

  if (@include_requests)
    json.requests @car_listing.requests do |request|
      Jbuilder.new do
        json.id request.id
        json.status request.status
        json.start_date request.start_date.strftime("%m/%d/%y")
        json.end_date request.end_date.strftime("%m/%d/%y")
      end
    end
  end
end
