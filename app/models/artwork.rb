class Artwork < ActiveRecord::Base
  belongs_to :artist
  has_many :favourites
  has_many :submissions

  geocoded_by :full_street_address
  reverse_geocoded_by :latitude, :longitude
  after_validation :reverse_geocode
end
