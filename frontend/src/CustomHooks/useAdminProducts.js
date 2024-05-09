import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import useUtilities from "./useUtilities";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function useAdminProducts(
  products,
  setProducts,
  setActiveProductIndex
) {
  const { navigate } = useUtilities();
  const schema = yup.object().shape({
    product_school: yup.string().required("What school is it?"),
    product_activity: yup.string().required("What activity is it?"),
    product_criteria: yup.string().required("E.g Reception - Year 6"),
    product_day: yup.string().required("E.g Monday or Tuesday - Friday"),
    product_price: yup
      .number()
      .integer()
      .typeError("A valid price is required")
      .required("Price is required. E.g 25"),
    product_activity_duration: yup
      .number()
      .integer()
      .typeError("1 for 1 day, 10 for 10 weeks")
      .required("1 for 1 day, 10 for 10 weeks"),
    product_time: yup.string().required("E.g 2:30 PM - 5 PM"),
    product_description: yup.string().required("Describe the activity"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const token = sessionStorage.getItem("token");

  const whichAPI =
    window.location.hostname === "localhost"
      ? process.env.REACT_APP_API_URL
      : process.env.REACT_APP_VURL;

  //   add product
  async function addProductSubmit(data) {
    // console.log(data);

    try {
      // Fetch CSRF token
      const csrfResponse = await axios.get(`${whichAPI}/csrf-token`);
      const csrfToken = csrfResponse.data.csrfToken;

      // Include CSRF token and Authorization token in headers
      const headers = {
        "X-CSRF-Token": csrfToken,
        Authorization: `Bearer ${token}`,
      };
      await axios
        .post(`${whichAPI}/admin-add-product`, data, {
          headers,
        })
        .then((res) => {
          // console.log(res);
          navigate("/admin");
        });
    } catch (error) {
      // console.log(error);
    }
  }

  // delete a product
  async function deleteProduct(productId) {
    // Fetch CSRF token
    const csrfResponse = await axios.get(`${whichAPI}/csrf-token`);
    const csrfToken = csrfResponse.data.csrfToken;

    // Include CSRF token and Authorization token in headers
    const headers = {
      "X-CSRF-Token": csrfToken,
      Authorization: `Bearer ${token}`,
    };
    try {
      axios.delete(`${whichAPI}/admin-delete-product/${productId}`, {
        headers,
      });

      const updatedProducts = products.filter(
        (product) => product.product_id !== productId
      );
      setProducts(updatedProducts);
      setActiveProductIndex(0);
    } catch (error) {
      // console.log("Error deleting product:", error);
    }
  }

  //update product

  const [selectedProduct, setSelectedProduct] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    const getProduct = async () => {
      try {
        // Fetch CSRF token
        const csrfResponse = await axios.get(`${whichAPI}/csrf-token`);
        const csrfToken = csrfResponse.data.csrfToken;

        // Include CSRF token and Authorization token in headers
        const headers = {
          "X-CSRF-Token": csrfToken,
          Authorization: `Bearer ${token}`,
        };
        const res = await axios.get(`${whichAPI}/products/${id}`, {
          headers,
        });

        // console.log(res.data, "product fetched successfully");

        setSelectedProduct(res.data);

        // /products/product-update
      } catch (error) {
        // console.log(error);
      }
    };

    getProduct();
  }, [id]);

  async function updateProductSubmit(data) {
    // console.log(data, "updatedProduct");
    try {
      // Fetch CSRF token
      const csrfResponse = await axios.get(`${whichAPI}/csrf-token`);
      const csrfToken = csrfResponse.data.csrfToken;

      // Include CSRF token and Authorization token in headers
      const headers = {
        "X-CSRF-Token": csrfToken,
        Authorization: `Bearer ${token}`,
      };
      await axios.put(`${whichAPI}/admin-update-product/${id}`, data, {
        headers,
      });
      navigate("/admin");
      // console.log(res);
    } catch (error) {}
  }

  return {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    isSubmitSuccessful,
    addProductSubmit,
    deleteProduct,
    updateProductSubmit,
    selectedProduct,
  };
}
