class MainController < ApplicationController

  def index
    @artworks = Artwork.all
    gon.artworks = @artworks
    gon.artists = Artist.all
  end

end