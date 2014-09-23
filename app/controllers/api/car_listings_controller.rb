module Api
  class CarListingsController < ApiController

    def create
      @car_listing = CarListing.new(car_listing_params)

      if @car_listing.save
        render json: @car_listing
      else
        render json: @car_listing.errors.full_messages, status: :unprocessable_entity
      end
    end

    def index
      @car_listings = CarListing.includes(:car).all
      render json: @car_listings
    end

    def show
      @car_listing = CarListing.includes(:car, :requests).find(params[:id])
      @include_requests =  @car_listing.leaser.id == current_user.id

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
        :leaser_id,
        :description,
        :title,
        :price,
        :deposit,
        :rules,
        :cancellation,
        :active
      )
    end

  end
end
