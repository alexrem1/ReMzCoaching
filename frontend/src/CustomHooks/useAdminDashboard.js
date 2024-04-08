import axios from "axios";
import { useEffect, useState } from "react";
export default function useAdminDashboard() {
  const [userData, setUserData] = useState([]);

  const whichAPI =
    window.location.hostname === "localhost"
      ? process.env.REACT_APP_API_URL
      : process.env.REACT_APP_VURL;

  useEffect(() => {
    const fetchUserOrders = async () => {
      try {
        const response = await axios.get(`${whichAPI}/admin-users-info`);
        setUserData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching user orders:", error);
      }
    };

    fetchUserOrders();
  }, [whichAPI]);

  const deleteOrder = async (orderId) => {
    await axios
      .delete(`${whichAPI}/admin-delete-users-orders/${orderId}`)
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
      // First, delete the user
      await axios.delete(`${whichAPI}/admin-delete-users-orders/${userId}`);

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
