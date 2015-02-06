module Api
  class UsersController < ApplicationController

    def index
      @users = User.all

      if params[:creator_id]
        query = <<-SQL
        SELECT
          u.*
        FROM
          users AS u
        LEFT OUTER JOIN
          likes AS l
        ON
          l.liker_id = u.id
        WHERE
          l.rhythm_id IN (SELECT
                            r.id
                          FROM
                            rhythms AS r
                          WHERE
                            r.creator_id = ? )
        SQL
        @users = @users.find_by_sql( [ query, params[:creator_id] ] )
      end

      if params[:liker_id]
        query = <<-SQL
        SELECT
          u.*
        FROM
          users AS u
        WHERE
          u.id IN (SELECT
                    r.creator_id
                  FROM
                    rhythms AS r
                  LEFT OUTER JOIN
                    likes AS l
                  ON
                    r.id = l.rhythm_id
                  WHERE
                    l.liker_id = ? )
        SQL
        @users = @users.find_by_sql( [ query, params[:liker_id] ] )
      end

      render :all
    end

    def show
      @user = User.find(params[:id])
      render :show
    end
  end
end
