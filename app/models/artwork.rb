class Artwork < ActiveRecord::Base
  belongs_to :artist
  has_many :favourites
  has_many :submissions
end
