module Api
  class RequestsController < ApiController

    def create
      s_date = DateTime.strptime(params[:request][:start_date], "%m/%d/%Y")
      e_date = DateTime.strptime(params[:request][:end_date], "%m/%d/%Y")

      @request = Request.new(
        start_date: s_date,
        end_date: e_date,
        car_listing_id: params[:request][:car_listing_id],
        leasee_id: current_user.id
      )

      if @request.save
        render json: @request, status: :created
      else
        render json: @request.errors.full_messages, status: :unprocessable_entity
      end
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
