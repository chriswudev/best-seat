class Api::SeatController < ApplicationController
  skip_before_action :verify_authenticity_token

  # GET /seat
  def index
    @seats = Seat.all.order(id: :asc)
    render json: @seats
  end

  # POST /seat
  def create
    seats = []
    params["_json"].each { |seat|
      seats.push({ row: seat[0], column: seat[1] })
    }
    Seat.create(seats)
    render json: { notice: "Added Seats" }
  end

  # GET /seat/best/:count
  def best_seats
    count = params[:count].to_i
    @seats = Seat.all.order(id: :asc)
    seat_pairs = []
    @seats.each { |seat|
      pair = "#{seat.row}-#{seat.column}"
      seat_pairs.push(pair)
    }
    center = (BestSeat::Column - 1).fdiv(2)

    seat_reference = []
    Array(0..BestSeat::Row - 1).each { |row|
      Array(0..BestSeat::Column - 1).each { |col|
        pair = "#{row}-#{col}"
        unless seat_pairs.include?(pair)
          distance = (col - center).abs + row
          reference = { seat: [row, col], distance: distance }
          seat_reference.push(reference)
        end
      }
    }
    sorted = seat_reference.sort_by { |reference| reference[:distance] }
    data = []
    sorted.each { |seat|
      data.push(seat[:seat])
      break if data.count >= count
    }
    render json: data
  end

  # DELETE /seat/
  def reset
    Seat.delete_all
    render json: { notice: "Deleted All Seats." }
  end
end
