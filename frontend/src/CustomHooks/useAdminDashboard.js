import axios from "axios";
import { useEffect, useState } from "react";
export default function useAdminDashboard() {
  const [userData, setUserData] = useState([]);
  const token = sessionStorage.getItem("token");

  const whichAPI =
    window.location.hostname === "localhost"
      ? process.env.REACT_APP_API_URL
      : process.env.REACT_APP_VURL;

  useEffect(() => {
    const fetchUserOrders = async () => {
      try {
        // Fetch CSRF token
        const csrfResponse = await axios.get(`${whichAPI}/csrf-token`);
        const csrfToken = csrfResponse.data.csrfToken;

        // Include CSRF token and Authorization token in headers
        const headers = {
          "X-CSRF-Token": csrfToken,
          Authorization: `Bearer ${token}`,
        };

        const response = await axios.get(`${whichAPI}/admin-users-info`, {
          headers,
        });
        setUserData(response.data);
        // console.log(response.data);
      } catch (error) {
        // console.error("Error fetching user orders:", error);
      }
    };

    fetchUserOrders();
  }, [whichAPI]);

  const deleteOrder = async (orderId) => {
    // Fetch CSRF token
    const csrfResponse = await axios.get(`${whichAPI}/csrf-token`);
    const csrfToken = csrfResponse.data.csrfToken;

    // Include CSRF token and Authorization token in headers
    const headers = {
      "X-CSRF-Token": csrfToken,
      Authorization: `Bearer ${token}`,
    };

    await axios
      .delete(`${whichAPI}/admin-delete-users-orders/${orderId}`, {
        headers,
      })
      .then((res) => {
        setUserData((prevUserOrders) => {
          // Update the userOrders state by filtering out the deleted order
          const updatedUserOrders = prevUserOrders.map((userOrder) => ({
            ...userOrder,
            orders: userOrder.orders.filter(
              (order) => order.order_id !== orderId
            ),
          }));
          return updatedUserOrders;
        });
      });
  };

  const deleteUser = async (userId) => {
    try {
      // Fetch CSRF token
      const csrfResponse = await axios.get(`${whichAPI}/csrf-token`);
      const csrfToken = csrfResponse.data.csrfToken;

      // Include CSRF token and Authorization token in headers
      const headers = {
        "X-CSRF-Token": csrfToken,
        Authorization: `Bearer ${token}`,
      };

      // First, delete the user
      await axios.delete(
        `${whichAPI}/admin-delete-users-and-orders/${userId}`,
        { headers }
      );

      // Then, filter out the deleted user from userData and also remove their orders
      setUserData((prevUserData) => {
        return prevUserData.filter((user) => user.id !== userId);
      });
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return { userData, deleteOrder, deleteUser };
}
