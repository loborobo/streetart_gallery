class CreateFavourites < ActiveRecord::Migration
  def change
    create_table :favourites do |t|
      t.string :user_id
      t.string :artwork_id

      t.timestamps
    end
  end
end
