class Vote < ActiveRecord::Base
  belongs_to :badge
  belongs_to :user
end
