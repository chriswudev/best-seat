class Api::MoviesController < ApplicationController
  before_action :set_movie, only: [:show, :edit, :update, :destroy]
  skip_before_action :verify_authenticity_token

  # GET /movies
  # GET /movies.json
  def index
    @movies = Movie.all.order(brand: :asc)
    render json: @movies
  end

  # GET /movies/1
  # GET /movies/1.json
  def show
    if @movie
      render json: @movie
    else
      render json: @movie.errors
    end
  end

  # GET /movies/new
  def new
    @movie = Movie.new
  end

  # GET /movies/1/edit
  def edit
  end

  # POST /movies
  # POST /movies.json
  def create
    @movie = Movie.new(movie_params)

    if @movie.save
      render json: @movie
    else
      render json: @movie.errors
    end
  end

  # PATCH/PUT /movies/1
  # PATCH/PUT /movies/1.json
  def update
    respond_to do |format|
      if @movie.update(movie_params)
        format.json { render json: { notice: "Updated Movie." } }
      else
        format.json { render json: @movie.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /movies/1
  # DELETE /movies/1.json
  def destroy
    @movie.destroy
    render json: { notice: "Deleted Movie." }
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_movie
    @movie = Movie.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def movie_params
    params.permit(:title, :summary, :year, :genre, :link)
  end
end
