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
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(`${whichAPI}/products`, {
          headers: { Authorization: `Bearer ${token}` },
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
