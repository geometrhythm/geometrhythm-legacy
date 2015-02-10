module Api
  class RhythmsController < ApplicationController
    def create
      # @rhythm = Rhythm.new(rhythm_params)
      # @rhythm.creator_id = current_user.id unless @rhythm.creator_id
      @rhythm = current_user.rhythms.create(rhythm_params)

      if @rhythm.save
        render :show 
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
        page_number = params[:page] #so this is necessary to start it over, but breaks the root page...
        # meaning, on some views, if there's no page given, it's meant to start over at 1
        # but on others if no page it's meant to give all of them
        render partial: 'api/rhythms/all', locals: {
          models: @rhythms,
          page_number: page_number,
          total_pages: @rhythms.total_pages
        }
      else
        render :all
      end
    end

    def match
      @rhythm = Rhythm.find_by_rhythm_str(params[:rhythm_str])
      if @rhythm
        render :show
      else
        render json: nil #, status: 404
      end
    end

    def show
      @rhythm = Rhythm.find(params[:id])
      render :show
    end

    def present
      @rhythm = Rhythm.new(rhythm_params)
      render :show
    end

    def rhythms_all
      @rhythms = Rhythm.all
      render :all
    end

    private

    def rhythm_params
      params.require(:rhythm).permit(:rhythm_str, :play_count, :creator_id)
    end
  end
end
