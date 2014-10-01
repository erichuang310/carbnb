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
      json.(
        request,
        :id,
        :start_date,
        :end_date,
        :status
      )
    end
  end
end
