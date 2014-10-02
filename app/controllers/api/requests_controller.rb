module Api
  class RequestsController < ApiController
    before_action :ensure_logged_in, only: [:create]

    def create
      unless params[:request][:start_date] == ""
        s_date = DateTime.strptime(params[:request][:start_date], "%m/%d/%Y")
      end
      unless params[:request][:end_date] == ""
        e_date = DateTime.strptime(params[:request][:end_date], "%m/%d/%Y")
      end


      @request = Request.new(
        start_date: s_date,
        end_date: e_date,
        car_listing_id: params[:request][:car_listing_id],
        leasee_id: current_user.id
      )

      if @request.save
        render json:
          { responseJSON: ["Submit a Request"] }, status: :created
      else
        render json: @request.errors.full_messages, status: :unprocessable_entity
      end
    end

    def index
      @requests = current_user.requests.includes(car_listing: :images)

      if @requests
        render :index
      else
        render json @requests.errors.full_messages, status: :unprocessable_entity
      end
    end

    def update
      @request = Request.find(params[:id])
      if request_params[:status] == "APPROVED"
        @request.approve!
      else
        @request.deny!
      end
      render json: @request, status: :ok
    end

    private
    def request_params
      params.require(:request).permit(
        :start_date,
        :end_date,
        :car_listing_id,
        :status
      )
    end
  end
end
