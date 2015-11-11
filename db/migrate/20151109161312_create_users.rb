class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :username
      t.string :firstname
      t.string :lastname
      t.string :email
      t.string :password_digest
      t.string :type
      t.text :description

      t.timestamps
    end
  end
end
