import axios from "axios";

export default function useDeleteUser() {
  const whichAPI =
    window.location.hostname === "localhost"
      ? process.env.REACT_APP_API_URL
      : process.env.REACT_APP_VURL;

  const deleteUser = async (userId) => {
    try {
      const token = sessionStorage.getItem("token");
      // Fetch CSRF token
      const csrfResponse = await axios.get(`${whichAPI}/csrf-token`);
      const csrfToken = csrfResponse.data.csrfToken;

      // Include CSRF token and Authorization token in headers
      const headers = {
        "X-CSRF-Token": csrfToken,
        Authorization: `Bearer ${token}`,
      };
      // First, delete the user
      await axios.delete(`${whichAPI}/delete-account/${userId}`, {
        headers,
      });
      return true;
    } catch (error) {
      console.error("Error deleting user:", error);
      return false;
    }
  };
  return { deleteUser };
}
