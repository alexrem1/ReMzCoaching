import axios from "axios";
import React, { useEffect, useState } from "react";
import { useGetProducts } from "../../CustomHooks/useGetProducts";
import { Link } from "react-router-dom";

function AdminProducts() {
  const { products, setProducts } = useGetProducts();

  const productsReadyToConsume = products.length > 0 && products;

  console.log(productsReadyToConsume);

  function deleteProduct(productId) {
    const whichAPI =
      window.location.hostname === "localhost"
        ? process.env.REACT_APP_API_URL
        : process.env.REACT_APP_VURL;
    try {
      axios.delete(`${whichAPI}/admin-delete-product/${productId}`);

      const updatedProducts = products.filter(
        (product) => product.product_id !== productId
      );
      setProducts(updatedProducts);
    } catch (error) {
      console.log("Error deleting product:", error);
    }
  }
  return (
    <>
      <button className="primary-cta">
        <Link to={"/admin/product-add"}>Add Product</Link>
      </button>
      {products.length > 0 && (
        <>
          <h3>Products</h3>
          {productsReadyToConsume.map((product, index) => (
            <div key={product.product_id} id={product.product_id}>
              <p>School: {product.product_school}</p>
              <input type="hidden" value={product.product_school} />
              <p>Activity: {product.product_activity}</p>
              <input type="hidden" value={product.product_activity} />
              <p>Year groups: {product.product_criteria}</p>
              <input type="hidden" value={product.product_criteria} />

              <p>Runs on: {product.product_day}</p>
              <input type="hidden" value={product.product_day} />

              <p>Price: £{product.product_price}</p>
              <input type="hidden" value={product.product_price} />
              <p>
                Occurence:{" "}
                {product.product_activity_duration > 1 ? (
                  <span>{product.product_activity_duration} weeks</span>
                ) : (
                  <span>Daily</span>
                )}
              </p>
              <input type="hidden" value={product.product_activity_duration} />
              <p>Duration: {product.product_time}</p>
              <input type="hidden" value={product.product_time} />
              <button className="primary-cta">
                <Link to={`/admin/product-update/${product.product_id}`}>
                  Update Product
                </Link>
              </button>
              <button
                onClick={() => {
                  deleteProduct(product.product_id);
                }}
              >
                Delete Product
              </button>
            </div>
          ))}
        </>
      )}
    </>
  );
}

export default AdminProducts;
