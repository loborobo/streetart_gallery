class ArtistsController < ApplicationController
  def index
    @artists = Artist.all
    @artworks = Artwork.where('creator IS NOT null')
  end

  def show
    @artist = Artist.find(params[:id])
  end

  protected

  def artist_params
    params.require(:artist).permit(:description, :creations)
  end

end
