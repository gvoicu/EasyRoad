class RoadsController < ApplicationController
  def index
    @roads = Road.all
  end

  def show
    @road = Road.find(params[:id])

    @road_status = RoadStatus.where("created_at > ? and created_at < ?", Time.now.beginning_of_day, Time.now.end_of_day).first
    if @road_status.blank?
      @road_status = RoadStatus.create(:road_status => Random.rand(3), :road_id => @road.id)
    end
  end

  def new
  end

  def create
    road = Road.new(:name => params[:name],
                    :start_lat => params[:start_lat], :end_lat => params[:end_lat],
                    :start_lng => params[:start_lng], :end_lng => params[:end_lng],
                    :start_adr => params[:start_adr], :end_adr => params[:end_adr])

    if road.save
      flash[:notice] = "Your road was saved"
    else
      flash[:notice] = "Your road was not saved"
    end

    redirect_to "/roads/#{road.id}"
  end
end
