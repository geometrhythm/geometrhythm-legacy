module Api
  class NamingsController < ApplicationController
    def create
      @naming = current_user.namings.new(naming_params)
      if @naming.save
        render json: @naming
      else
        render json: @naming.errors.full_messages, status: :unprocessable_entity
      end
    end

    def destroy
      @naming = current_user.namings.find(params[:id])
      @naming.try(:destroy)
      render json: {}
    end

    def show
      @naming = Naming.find(params[:id])
      render :show
    end

    def index
      @namings = Naming.all
      render :all
    end

    private

    def naming_params
      params.require(:naming).permit(:namer_id, :rhythm_id, :name_id)
    end

  end
end
