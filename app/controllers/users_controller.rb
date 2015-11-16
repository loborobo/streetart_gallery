class UsersController < ApplicationController
  def index
    @users = User.all
  end

  def show
    @user = current_user
  end

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)

    if @user.save
      session[:user_id] = @user.id
      if @user.type == 'Artist'
        redirect_to artworks_claim_path
      else
        redirect_to main_index_path, notice: "Welcome aboard, #{@user.firstname}!"
      end
    else 
      render :new
    end
  end 

  def edit
    if !current_user
      redirect_to main_index_path, notice: "You are not logged in."
    else
      @user = current_user
    end
  end

  def delete

  end

  protected

  def user_params
    if params[:is_artist] == "on"
      params.require(:user).permit(:username, :email, :firstname, :lastname, :password, :password_confirmation, :description).merge(type: 'Artist')
    else
      params.require(:user).permit(:username, :email, :firstname, :lastname, :password, :password_confirmation)
    end
  end

end
