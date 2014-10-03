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
    :address,
    :latitude,
    :longitude
  )

  imageUrls = []
  car_listing.images.each do |image|
    imageUrls << image.file_picker_url
  end

  json.imageUrls imageUrls

end
