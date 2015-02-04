module Api
  class RhythmsController < ApplicationController
    def create
      @rhythm = current_user.rhythms.new(rhythm_params)

      if @rhythm.save
        render json: @rhythm
      else
        render json: @rhythm.errors.full_messages, status: :unprocessable_entity
      end
    end

    # def destroy
    #   @rhythm = current_user.rhythms.find(params[:id])
    #   @rhythm.try(:destroy)
    #   render json: {}
    # end

    # def update
    #   @rhythm = Rhythm.find(params[:id])
    #   @rhythm.save
    # end

    def index
      @rhythms = Rhythm.all
      render json: @rhythms
    end

    def show
      @rhythm = Rhythm.find(params[:id])

      render :show
    end

    private

    def rhythm_params
      params.require(:rhythm).permit(:rhythm_str, :play_count)
    end
  end
end
