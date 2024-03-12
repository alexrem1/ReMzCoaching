import { useGetUserBookings } from "../CustomHooks/useGetUserBookings";

function ShowUserBookings() {
  const { myBooking } = useGetUserBookings();

  return (
    <div>
      <h1>My Bookings</h1>

      {myBooking.map((booking) => (
        <div key={booking.order_id}>
          <>
            <p>{booking.product_activity}</p>
            <p>{booking.product_school}</p>
            <p>{booking.product_time}</p>

            {booking.isCompleted === 1 && (
              <p>
                You have paid £
                {booking.product_price * booking.product_activity_duration} for
                this session.
              </p>
            )}
          </>
          <br />
        </div>
      ))}
    </div>
  );
}

export default ShowUserBookings;
