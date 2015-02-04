module Api
  class LikesController < ApplicationController
    def create
      @like = current_user.rhythm_likings.new(like_params)
      #debugger
      if @like.save
        render json: @like
      else
        render json: @like.errors.full_messages, status: :unprocessable_entity
      end
    end

    def destroy
      @like = current_user.rhythm_likings.find(params[:id])
      @like.try(:destroy)
      render json: {}
    end

    # def index
    #   @likes = Like.all
    #   render :all
    # end

    def show
      @like = Like.find(params[:id])
      render :show
    end

    private

    def like_params
      params.require(:like).permit(:rhythm_id, :liker_id)
    end

  end
end
