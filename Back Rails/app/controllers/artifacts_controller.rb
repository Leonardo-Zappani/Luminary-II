class ArtifactsController < ApplicationController
  before_action :set_artifact, only: %i[ show update destroy ]

  # GET /artifacts
  def index
    @artifacts = Artifact.all

    render json: @artifacts
  end

  # GET /artifacts/1
  def show
    render json: @artifact
  end

  # POST /artifacts
  def create
    @artifact = Artifact.new(artifact_params)

    if @artifact.save
      render json: @artifact, status: :created, location: @artifact
    else
      render json: @artifact.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /artifacts/1
  def update
    if @artifact.update(artifact_params)
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

    # Only allow a list of trusted parameters through.
    def artifact_params
      params.fetch(:artifact, {})
    end
end
