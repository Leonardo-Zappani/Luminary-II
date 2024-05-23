class ArtifactsController < ApplicationController
  before_action :set_artifact, only: %i[show update destroy]

  # GET /artifacts
  def index
    artifacts = Artifact.all
    render json: artifacts_payload(artifacts)
  end

  # GET /artifacts/1
  def show
    render json: artifact_payload(@artifact)
  end

  # POST /artifacts
  def create
    @artifact = Artifact.new(artifact_params)

    if @artifact.save
      render json: artifact_payload(@artifact), status: :created, location: @artifact
    else
      render json: @artifact.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /artifacts/1
  def update
    if @artifact.update(artifact_params)
      render json: artifact_payload(@artifact)
    else
      render json: @artifact.errors, status: :unprocessable_entity
    end
  end

  # DELETE /artifacts/1
  def destroy
    @artifact.destroy!
  end

  private

  def set_artifact
    @artifact = Artifact.find(params[:id])
  end

  def artifact_params
    {
      name: params[:name],
      description: params[:description],
      user_ids: params[:users].join(','),
      item_ids: params[:items].join(',')
    }
  end

  def artifact_payload(artifact)
    {
      id: artifact.id,
      name: artifact.name,
      description: artifact.description,
      assigned_names: artifact.user_ids&.split(','),
      item_names: artifact.item_ids&.split(',')
    }
  end

  def artifacts_payload(artifacts)
    artifacts.map do |artifact|
      artifact_payload(artifact)
    end
  end
end
