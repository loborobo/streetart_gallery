class MainController < ApplicationController

  def index
    gon.artworks = Artwork.all
  end

end
