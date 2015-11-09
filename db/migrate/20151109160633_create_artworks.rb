class CreateArtworks < ActiveRecord::Migration
  def change
    create_table :artworks do |t|
      t.string :name
      t.float :latitude
      t.float :longitude
      t.string :image

      t.timestamps
    end
  end
end
