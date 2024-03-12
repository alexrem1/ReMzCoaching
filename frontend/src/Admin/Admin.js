import { useEffect, useState } from "react";
import { useIsAuthenticated } from "../Context/AuthContext";
import axios from "axios";

function Admin() {
  const { role } = useIsAuthenticated();

  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);

  const whichAPI =
    window.location.hostname === "localhost"
      ? process.env.REACT_APP_API_URL
      : process.env.REACT_APP_VURL;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        await axios.get(`${whichAPI}/users`).then((res) => {
          setUsers(res.data);
        });
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchUsers();

    const fetchBookings = async () => {
      try {
        await axios.get(`${whichAPI}/bookings`).then((res) => {
          setBookings(res.data);
        });
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchBookings();
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(`${whichAPI}/users/${id}`).then((res) => {
      setUsers(users.filter((user) => user.id !== id));
    });
  };
  const handleBookingDelete = async (id) => {
    await axios.delete(`${whichAPI}/bookings/${id}`).then((res) => {
      console.log(res);
      setBookings(bookings.filter((booking) => booking.booking_id !== id));
    });
  };

  return (
    <div>
      <h1>You're an authorized {role}</h1>
      <div>
        {users.map((user) => (
          <div key={user.id}>
            <>
              <p>
                You're authorized {user.CarerFirstName} {user.CarerLastName}
              </p>
              <p>Email: {user.Email}</p>
              <p>Contact number: {user.ContactNumber}</p>
              <p>Emergency contact number: {user.EmergencyContactNumber}</p>
              <br />
              <p>
                First child name: {user.FirstChildFirstName}{" "}
                {user.FirstChildLastName}
              </p>
              <p>
                First child DOB:
                {user.FirstChildDOB}
              </p>
              <p>
                First child year group:
                {user.FirstChildYearGroup}
              </p>
              <p>First child medical info: {user.FirstChildMedical}</p>
              {user.SecondChildFirstName && (
                <>
                  <p>
                    Second child name: {user.SecondChildFirstName}{" "}
                    {user.SecondChildLastName}
                  </p>
                  <p>
                    Second child DOB:
                    {user.SecondChildDOB}
                  </p>
                  <p>
                    Second child year group:
                    {user.SecondChildYearGroup}
                  </p>
                  <p>
                    Second child medical info:
                    {user.SecondChildMedical}
                  </p>
                </>
              )}
            </>

            {user.Permission === 1 ? (
              <p>Permission: Yes</p>
            ) : (
              <p>Permission: No</p>
            )}
            {user.PupilPremium === 1 ? (
              <p>Pupil Premium: Yes</p>
            ) : (
              <p>Pupil Premium: No</p>
            )}
            <button
              onClick={() => {
                handleDelete(user.id);
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      <br />
      <h1>Bookings made {bookings.length}</h1>
      <div>
        {bookings.map((booking) => (
          <p key={booking.booking_id}>
            User: {booking.userName} | Date: {booking.booking_date} | Time:{" "}
            {booking.booking_time}
            <br />
            <button
              onClick={() => {
                handleBookingDelete(booking.booking_id);
              }}
            >
              Delete
            </button>
          </p>
        ))}
      </div>
    </div>
  );
}

export default Admin;
