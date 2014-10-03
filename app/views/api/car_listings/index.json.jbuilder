json.array! @car_listings do |car_listing|
  json.(
    car_listing,
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
    :car_type,
    :address,
    :latitude,
    :longitude
  )

  imageUrls = []
  car_listing.images.each do |image|
    imageUrls << image.file_picker_url
  end

  json.imageUrls imageUrls

  unless car_listing.requests.empty?
    json.requests car_listing.requests
  end

end
