Jbuilder.new do
  json.(
    @car_listing,
    :id,
    :leaser_id,
    :title,
    :description,
    :price,
    :deposit,
    :rules,
    :cancellation,
    :active
  )

  json.car @car_listing.car

  if (@include_requests)
    json.i @car_listing.requests do |request|
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
