import { useEffect, useState } from "react";
import axios from "axios";

export const useGetProducts = () => {
  const [products, setProducts] = useState([]);

  const whichAPI =
    window.location.hostname === "localhost"
      ? process.env.REACT_APP_API_URL
      : process.env.REACT_APP_VURL;

  useEffect(() => {
    const fetchUserBookings = async () => {
      try {
        const response = await axios.get(`${whichAPI}/products`);
        setProducts(response.data);
        // console.log(response.data, "products fetched");
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchUserBookings();
  }, []);

  return { products };
};
