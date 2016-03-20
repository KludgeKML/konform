class IndexController < ApplicationController
  def index
    params[:name] = 'a'
  end
end
