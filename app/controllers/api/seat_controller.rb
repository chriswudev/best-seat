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

    data = get_best_seats(count)
    render json: data
  end

  # DELETE /seat/
  def reset
    Seat.delete_all
    render json: { notice: "Deleted All Seats." }
  end

  private

  def get_best_seats(count)
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

    current_row = 0
    data = get_group_seats(sorted, count, current_row)
    return data
  end

  def get_group_seats(seats, count, row)
    data = []
    max_col = 0
    min_col = 0
    seats.each { |seat|
      if row == seat[:seat][0]
        if data.count == 0
          data.push(seat[:seat])
          current_col = seat[:seat][1]
          max_col = min_col = current_col
        else
          current_col = seat[:seat][1]
          diff_left = min_col - current_col
          diff_right = current_col - max_col
          if diff_left.abs == 1 || diff_right.abs == 1
            data.push(seat[:seat])
            if current_col < min_col
              min_col = current_col
            else
              max_col = current_col
            end
          end
        end
        break if data.count >= count
      end
    }
    if data.count < count && row < (BestSeat::Column - 1)
      data = get_group_seats(seats, count, row + 1)
    end
    return data
  end
end
