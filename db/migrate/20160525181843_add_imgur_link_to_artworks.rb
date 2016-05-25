class AddImgurLinkToArtworks < ActiveRecord::Migration
  def change
  	add_column :artworks, :imgur_link, :string
  	add_column :artworks, :imgur_hash, :string
  end
end
