import axios from "axios";

export default function useDeleteUser() {
  const whichAPI =
    window.location.hostname === "localhost"
      ? process.env.REACT_APP_API_URL
      : process.env.REACT_APP_VURL;

  const deleteUser = async (userId) => {
    try {
      // First, delete the user
      await axios.delete(`${whichAPI}/delete-account/${userId}`);
      return true;
    } catch (error) {
      console.error("Error deleting user:", error);
      return false;
    }
  };
  return { deleteUser };
}