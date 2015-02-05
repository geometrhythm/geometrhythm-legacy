module Api
  class NamesController < ApplicationController
    def create
      @name = Name.new(name_params)
      if @name.save
        render json: @name
      else
        render json: @name.errors.full_messages, status: :unprocessable_entity
      end
    end

    def destroy
      @name = Name.find(params[:id])
      @name.try(:destroy)
      render json: {}
    end

    def show
      @name = Name.find(params[:id])
      render :show
    end

    def index
      @names = Name.all
      render :all
    end

    private

    def name_params
      params.require(:name).permit(:name)
    end

  end
end
