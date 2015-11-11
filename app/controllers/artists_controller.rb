class ArtistsController < ApplicationController
  def index
    @artists = Artist.all
  end

  protected

  def artist_params
    params.require(:artist).permit(:description, :creations)
  end

end
