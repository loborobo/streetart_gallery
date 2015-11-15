class MainController < ApplicationController

  def index
    gon.artworks = Artwork.all
    gon.artists = Artist.all
  end

end