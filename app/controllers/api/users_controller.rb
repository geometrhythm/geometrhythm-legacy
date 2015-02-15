module Api
  class UsersController < ApplicationController

    def index
      @users = User.all.includes(:rhythms).includes(:liked_rhythms)

      if params[:creator_id]
        @users = @users.joins('LEFT OUTER JOIN likes
          on likes.liker_id = users.id')
          .where('likes.rhythm_id' =>
          Rhythm.where(creator_id:
          params[:creator_id])
          .pluck(:id))
          .distinct
      end

      if params[:liker_id]
        @users = @users.where(id:
          Rhythm.joins('LEFT OUTER JOIN likes
          on likes.rhythm_id = rhythms.id')
          .where('likes.liker_id' =>
          params[:liker_id])
          .pluck(:creator_id))
          .distinct
      end

      render :all
    end

    def show
      @user = User.find(params[:id]).includes(:rhythms).includes(:liked_rhythms)
      render :show
    end
  end
end
