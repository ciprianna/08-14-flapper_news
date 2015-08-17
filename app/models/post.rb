class Post < ActiveRecord::Base
  has_many :comments
  belongs_to :user

  # Using the super method to return json with a post's comments
  def as_json(options = {})
    super(options.merge(include: :comments))
  end
end
