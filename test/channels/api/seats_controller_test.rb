require "test_helper"

class Api::SeatControllerTest < ActionController::TestCase
  test "the get_best_seats returns [[0,6]] for single seat" do
    assert_equal [[0,6]], @controller.send(:get_best_seats, 1)
  end
end
