class User < ActiveRecord::Base
  has_many :submissions
  has_many :favourites
  has_secure_password

  validates :username, :email, uniqueness: true
  validates :firstname, :lastname, presence: true

end
