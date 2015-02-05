module Api
  class CommentsController < ApplicationController
    def create
      @comment = current_user.comments.new(comment_params)

      if @comment.save
        render json: @comment
      else
        render json: @comment.errors.full_messages, status: :unprocessable_entity
      end
    end

    def destroy
      @comment = current_user.comments.find(params[:id])
      @comment.try(:destroy)
      render json: {}
    end

    def show
      @comment = Comment.find(params[:id])
      render :show
    end

    def update
      @comment = Comment.find(params[:id])
      @comment.update(comment_params)
      render json: @comment
    end

    private

    def comment_params
      params.require(:comment)
        .permit(:body, :commentable_id, :commentable_type, :user_id)
    end

  end
end
