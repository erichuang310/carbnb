module Api
  class CarListingsController < ApiController
    before_action :ensure_logged_in, only: [:create]

    def create
      @car_listing = current_user.car_listings.new(car_listing_params)

      if @car_listing.save
        render json: @car_listing, status: :created
      else
        render json: @car_listing.errors.full_messages, status: :unprocessable_entity
      end
    end

    def index
      @car_listings = nil
      if search_params[:current_user] == "true"
        @car_listings = CarListing.includes(:images, :requests)
          .where(leaser: current_user);
      else
        @car_listings =
          CarListing
            .includes(:images)
            .where("rate between ? AND ?", search_params[:rate_min], search_params[:rate_max])
            .where(car_type: search_params[:car_type])
            .where("latitude between ? AND ?", search_params[:sw_lat], search_params[:ne_lat])
            .where("longitude between ? AND ?", search_params[:sw_lng], search_params[:ne_lng])
        if search_params[:start_date] && search_params[:start_date] != "" &&
           search_params[:end_date] && search_params[:end_date] != ""
          puts "\n\n\nwtf\n\n\n"
          p search_params[:start_date]

          p search_params[:end_date]

          # start_date, end_date = nil, nil
          # unless search_params[:start_date] == ""
            start_date = DateTime.strptime(search_params[:start_date], "%m/%d/%Y")
          # end
          # unless search_params[:end_date] == ""
            end_date = DateTime.strptime(search_params[:end_date], "%m/%d/%Y")
          # end

          @car_listings =
            CarListing
              .joins("LEFT JOIN requests ON car_listings.id = requests.car_listing_id")
              .where(:requests => { status: "Approved" })
              .where(<<-SQL, start_date: start_date, end_date: end_date)
                ((start_date > :end_date) OR
                (end_date < :start_date))
              SQL
            # .pluck("car_listings.id")
        end
      end
      render :index
    end

    def show
      @car_listing = CarListing.includes(:images, :requests).find(params[:id])
      @include_requests = false
      @include_requests = true if @car_listing.leaser == current_user

      if @car_listing
        render :show
      else
        render json: ["Car listing not found"], status: :not_found
      end
    end

    def destroy
      @car_listing = current_user.car_listings.find(params[:id])
      @car_listing.try(:destroy)
      render json: {}
    end

    private
    def car_listing_params
      params.require(:car_listing).permit(
        :title,
        :description,
        :address,
        :rate,
        :deposit,
        :cancellation,
        :active,
        :car_year,
        :car_make,
        :car_model,
        :car_color
      )
    end

    def search_params
      ActionController::Parameters.new(
        current_user: params[:current_user],
        lat: params[:lat] || 37.7748662034,
        lng: params[:lng] || -122.4194155,
        sw_lng: params[:sw_lng] || "-122.51554587109376",
        ne_lng: params[:ne_lng] || "-122.32328512890626",
        ne_lat: params[:ne_lat] || "37.87160967668078",
        sw_lat: params[:sw_lat] || "37.67812273013742",
        start_date: params[:start_date],
        end_date: params[:end_date],
        rate_min: params[:rate_min] || 50,
        rate_max: params[:rate_max] || 500,
        car_type: params[:car_type] || ["Sport", "Utility", "Luxury", "Economy"]
      )

    end
  end
end
