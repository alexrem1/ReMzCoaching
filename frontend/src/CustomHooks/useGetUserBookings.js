import { useEffect, useState } from "react";
import { useIsAuthenticated } from "../Context/AuthContext";
import axios from "axios";

export const useGetUserBookings = () => {
  const { userID } = useIsAuthenticated();
  const [myBooking, setMyBooking] = useState([]);
  const whichAPI =
    window.location.hostname === "localhost"
      ? process.env.REACT_APP_API_URL
      : process.env.REACT_APP_VURL;

  useEffect(() => {
    const fetchUserBookings = async () => {
      try {
        const response = await axios.get(`${whichAPI}/orders/${userID}`);
        setMyBooking(response.data);
        console.log(response, "user bookings fetched");
      } catch (error) {
        console.error("Error fetching user bookings:", error);
      }
    };
    fetchUserBookings();
  }, []);

  return { myBooking };
};
