class ArtworksController < ApplicationController
  before_action :set_artwork, only: [:show, :edit, :update, :destroy]

  # GET /artworks
  # GET /artworks.json
  def index
    @artworks = Artwork.all
  end

  # GET /artworks/1
  # GET /artworks/1.json
  def show
    @artwork = Artwork.find(params[:id])
  end

  # GET /artworks/new
  def new
    @artwork = Artwork.new
  end

  # POST /artworks
  # POST /artworks.json
  def create
    @artwork = Artwork.new(artwork_params)

    if @artwork.save
     redirect_to artworks_path, notice: 'Artwork was successfully created.' 
    else
      render action: 'new'
    end
  end

  # GET /artworks/1/edit
  def edit
    @artwork = Artwork.find(params[:id])
  end


  # PATCH/PUT /artworks/1
  # PATCH/PUT /artworks/1.json
  def update
    respond_to do |format|
      if @artwork.update_attributes(artwork_params)
        redirect_to artwork_path, notice: 'Artwork was successfully updated.'
      else
        render action: 'edit' 
      end
    end
  end

  # DELETE /artworks/1
  # DELETE /artworks/1.json
  def destroy
    @artwork.destroy
    respond_to do |format|
      format.html { redirect_to artworks_url }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_artwork
      @artwork = Artwork.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def artwork_params
      params.require(:artwork).permit(:name, :latitude, :longitude, :image, :description)
    end
end
