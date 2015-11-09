class CreateSubmissions < ActiveRecord::Migration
  def change
    create_table :submissions do |t|
      t.string :image
      t.string :user_id
      t.string :artwork_id

      t.timestamps
    end
  end
end
