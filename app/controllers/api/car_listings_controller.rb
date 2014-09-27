module Api
  class CarListingsController < ApiController

    def create
      @car_listing = current_user.car_listings.new(car_listing_params)

      if @car_listing.save
        render json: @car_listing, status: :created
      else
        render json: @car_listing.errors.full_messages, status: :unprocessable_entity
      end
    end

    def index
      puts search_params
      
      puts "\n\n\n"
      puts "\n\n\n"
      puts "\n\n\n"

      @car_listings = CarListing.limit(10);
      render json: @car_listings
    end

    def show
      @car_listing = CarListing.find(params[:id])
      @include_requests = false

      if @car_listing
        render json: @car_listing
        # render :show
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
        :car_type,
        :min_price,
        :max_price
      )
    end
  end
end
