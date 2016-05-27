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
    if !current_user
      redirect_to main_index_path, notice: "Please log in to submit art"
    else
      @artwork = Artwork.new
    end
  end

  # POST /artworks
  # POST /artworks.json
  def create
    @artwork = Artwork.new(artwork_params)
    @@imgur_session = Imgurapi::Session.new(client_id: ENV['IMGUR_CLIENT_ID'], client_secret: ENV['IMGUR_CLIENT_SECRET'], access_token: ENV['IMGUR_ACCESS_TOKEN'], refresh_token: ENV['IMGUR_REFRESH_TOKEN'])
    image = @@imgur_session.image.image_upload(@artwork.image.tempfile.path)
    @artwork.imgur_hash = image.hash
    @artwork.image = image.link
    if @artwork.save
     redirect_to main_index_path
     # , flash[:notice] = 'Artwork was successfully created.' 
    else
      render action: 'new'
    end
  end

  # GET /artworks/1/edit
  def edit
    @artwork = Artwork.find(params[:id])
  end

  #GET /artworks/claim
  def claim #form 3 - artists add their work to profile
    @artworks = Artwork.all
  end

  #PATCH /artworks/add
  def submit_claim
    @artworks = Artwork.where(id: params[:art_]);
    @artworks.update_all(creator: current_user.id )
    redirect_to main_index_path, notice: 'Artworks have been claimed!'
  end

  # PATCH/PUT /artworks/1
  # PATCH/PUT /artworks/1.json
  def update
    if @artwork.update_attributes(artwork_params)
      redirect_to artwork_path, notice: 'Artwork was successfully updated.'
    else
      render action: 'edit' 
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
      params.require(:artwork).permit(:name, :latitude, :longitude, :image, :description, :creator)
    end
end


# 


