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
      @car_listings = CarListing.includes(:images).where(
        "latitude between ? AND ?",
        search_params[:bottom_border],
        search_params[:top_border]
      ).where(
        " longitude between ? and ?",
        search_params[:left_border],
        search_params[:right_border]
      ).where(
        car_type: search_params[:car_type]
      ).where(
        "rate between ? AND ?",
        search_params[:rate_min],
        search_params[:rate_max]
      )
      render :index
    end

    def show
      @car_listing = CarListing.includes(:images).find(params[:id])
      @include_requests = false

      if @car_listing
        # render json: @car_listing
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
      params.permit(
        :left_border,
        :top_border,
        :right_border,
        :bottom_border,
        :start_date,
        :end_date,
        :rate_min,
        :rate_max,
        car_type: []
      )
    end
  end
end
