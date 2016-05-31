class Badge < ActiveRecord::Base
  belongs_to :student
  has_many :votes

  def points
    self.votes.pluck(:vote_type).inject(:+)
  end
end
