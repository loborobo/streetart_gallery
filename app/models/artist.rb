class Artist < User
  has_many :artworks
end

# class User < ActiveRecord::Base
#   has_many :submissions
#   has_many :favourites
# end

# class Artwork < ActiveRecord::Base
#   belongs_to :artist
#   has_many :favourites
#   has_many :submissions
# end

# class Favourite <ActiveRecord::Base
#   belongs_to :user
#   belongs_to :artwork
# end

# class Submission <ActiveRecord::Base
#   belongs_to :artwork
#   belongs_to :user
# end
