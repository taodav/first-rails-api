class CohortsController < ApplicationController
  def index
    cohorts = Cohort.all
    render json: cohorts
  end

  def show
    render json: Cohort.find(params[:id]).students
  end
end
