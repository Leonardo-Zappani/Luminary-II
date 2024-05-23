class ArtifactsController < ApplicationController
  before_action :set_artifact, only: %i[ show update destroy ]

  # GET /artifacts
  def index
    @artifacts = Artifact.all
    payload = @artifacts.map do |artifact|
      {
        id: artifact.id,
        name: artifact.name,
        description: artifact.description,
        assigned_names: artifact.user_names,
        item_names: artifact.item_names,
      }
    end

    render json: payload
    end


  # GET /artifacts/1
  def show
    payload = {
      id: @artifact.id,
      name: @artifact.name,
      description: @artifact.description,
      assigned_names: @artifact.user_ids&.split(','),
      item_names: @artifact.item_ids&.split(','),
    }
    render json: payload
  end

  # POST /artifacts
  def create
    @artifact = Artifact.new(description: params[:description], name: params[:name], user_ids: params[:users].join(','), item_ids: params[:items].join(','))

    if @artifact.save
      render json: @artifact, status: :created, location: @artifact
    else
      render json: @artifact.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /artifacts/1
  def update
    if @artifact.update(description: params[:description], name: params[:name], user_ids: params[:users].join(','), item_ids: params[:items].join(','))
      render json: @artifact
    else
      render json: @artifact.errors, status: :unprocessable_entity
    end
  end

  # DELETE /artifacts/1
  def destroy
    @artifact.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_artifact
      @artifact = Artifact.find(params[:id])
    end
end
