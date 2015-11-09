class User < ActiveRecord::Base
  has_many :submissions
  has_many :favourites
end
