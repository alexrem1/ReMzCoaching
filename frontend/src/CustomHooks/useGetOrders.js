import { useEffect, useState } from "react";
import { useIsAuthenticated } from "../Context/AuthContext";
import axios from "axios";

export const useGetOrders = () => {
  const { userID } = useIsAuthenticated();
  const [myOrders, setMyOrders] = useState([]);
  const whichAPI =
    window.location.hostname === "localhost"
      ? process.env.REACT_APP_API_URL
      : process.env.REACT_APP_VURL;

  useEffect(() => {
    const fetchMyOrders = async () => {
      const token = sessionStorage.getItem("token");

      try {
        const response = await axios.get(`${whichAPI}/orders/${userID}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMyOrders(response.data);
        console.log(response, "user bookings fetched");
      } catch (error) {
        console.error("Error fetching user bookings:", error);
      }
    };
    fetchMyOrders();
  }, []);

  return { myOrders };
};
