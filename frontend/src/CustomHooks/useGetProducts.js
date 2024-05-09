import { useEffect, useState } from "react";
import axios from "axios";

export const useGetProducts = () => {
  const [products, setProducts] = useState([]);

  const whichAPI =
    window.location.hostname === "localhost"
      ? process.env.REACT_APP_API_URL
      : process.env.REACT_APP_VURL;

  useEffect(() => {
    const fetchUserProducts = async () => {
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
        const response = await axios.get(`${whichAPI}/products`, {
          headers,
        });
        setProducts(response.data);
        // console.log(response.data, "products fetched");
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchUserProducts();
  }, []);

  return { products, setProducts };
};
