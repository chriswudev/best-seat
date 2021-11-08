require "test_helper"

class SeatControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get seat_index_url
    assert_response :success
  end
end
