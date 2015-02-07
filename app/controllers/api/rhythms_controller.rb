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

    def update
      @rhythm = Rhythm.find(params[:id])
      @rhythm.update(rhythm_params)
      render json: @rhythm
    end

    def index
      @rhythms = Rhythm.all

      if params[:creator_id] #&& !@rhythms.empty?
        @rhythms = Rhythm.where(creator_id: params[:creator_id])
      end

      if params[:rhythm_str] #&& !@rhythms.empty?
        @rhythms = @rhythms.where(rhythm_str: params[:rhythm_str])
      end

      if params[:liker_id] #&& !@rhythms.empty?
        @rhythms = @rhythms.where(id: User.find(params[:liker_id]).liked_rhythms)
      end



      if params[:page]
        @rhythms = @rhythms.page(params[:page]).per(25)
      # render :all
        page_number = params[:page] #so this is necessary to start it over, but breaks the root page...
        render partial: 'api/rhythms/all', locals: {
          models: @rhythms,
          page_number: page_number,
          total_pages: @rhythms.total_pages
        }
      else
        render :all
      end
    end

    def show
      @rhythm = Rhythm.find(params[:id])
      render :show
    end

    def rhythms_all
      @rhythms = Rhythm.all
      render :all
    end

    # def exists_in_db
    #   @rhythm = Rhythm.find(params[:rhythm_str])
    #   render :show if @rhythm
    #   render json: {}
    # end
    #
    # $.ajax(options)
    # options would be url where sends request, by default get, seems fine
    # data type json
    # data is the payload
    # on success do the thing w widget

    private

    def rhythm_params
      params.require(:rhythm).permit(:rhythm_str, :play_count)
    end
  end
end
