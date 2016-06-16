class Student < ActiveRecord::Base
  belongs_to :cohort
  has_many :badges

  def as_json(options = {})
    super(options.merge(include: {badges: {methods: :points}}))
  end
end
