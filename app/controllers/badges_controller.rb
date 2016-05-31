class BadgesController < ApplicationController
  def vote
    badge = Badge.find(params[:id])
    badge.votes.create(vote_params)
  end

  private
  def vote_params
    return params.require(:vote).permit(:vote_type, :user)
  end

end

#
