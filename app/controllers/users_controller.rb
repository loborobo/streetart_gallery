class UsersController < ApplicationController
  def index
    @users = User.all
  end

  def show

  end

  def new
    @user = User.new
  end

  def create
    
    if params[:is_artist] == "on"
      params[:user][:type] = 'Artist'
    end
   
    @user = User.new(user_params)

    if @user.save
      session[:user_id] = @user.id
      redirect_to main_index_path, notice: "Welcome aboard, #{@user.firstname}!"
    else 
      render :new
    end
  end 

  def edit
  end

  def delete

  end

  protected

  def user_params
    params.require(:user).permit(:username, :email, :firstname, :lastname, :password, :password_confirmation, :type)
  end

end
