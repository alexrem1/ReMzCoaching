import { useEffect, useState } from "react";
import { useIsAuthenticated } from "../Context/AuthContext";
import axios from "axios";

export default function useGetProfile() {
  const { userID } = useIsAuthenticated();

  const [userDetails, setUserDetails] = useState([]);

  const whichAPI =
    window.location.hostname === "localhost"
      ? process.env.REACT_APP_API_URL
      : process.env.REACT_APP_VURL;

  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = sessionStorage.getItem("token");
      // Fetch CSRF token
      const csrfResponse = await axios.get(`${whichAPI}/csrf-token`);
      const csrfToken = csrfResponse.data.csrfToken;

      // Include CSRF token and Authorization token in headers
      const headers = {
        "X-CSRF-Token": csrfToken,
        Authorization: `Bearer ${token}`,
      };
      try {
        await axios
          .get(`${whichAPI}/users/${userID}`, {
            headers,
          })
          .then((res) => {
            setUserDetails(res.data);
            // console.log(res.data);
          });
      } catch (error) {
        // console.log("error", error);
      }
    };

    fetchUserDetails();
  }, []);

  const maskPassword = (password) => {
    return "*".repeat(15);
  };

  return {
    userDetails,
    maskPassword,
  };
}
