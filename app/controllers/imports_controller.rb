class ImportsController < ApplicationController
  def new
    @import = Import.new
  end

  def create
    @import = Import.new params[:import]
    if @import.save
    else
    end
  end
end
