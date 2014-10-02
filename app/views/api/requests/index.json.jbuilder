json.array! @requests do |request|
  json.(
    request,
    :id,
    :status
  )


  json.start_date request.start_date.strftime("%m/%d/%y")
  json.end_date request.end_date.strftime("%m/%d/%y")

  json.car_listing do
    json.(
      request.car_listing,
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
    json.imageUrls request.car_listing.images.pluck(:file_picker_url)
  end
end
