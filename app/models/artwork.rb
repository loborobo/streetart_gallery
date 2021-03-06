class Artwork < ActiveRecord::Base
  belongs_to :artist
  has_many :favourites
  has_many :submissions

  validates :name, :image, :latitude, :longitude, presence: true

end
