import { useGetProducts } from "../../CustomHooks/useGetProducts";
import "./adminProducts.css";
import useUtilities from "../../CustomHooks/useUtilities";
import useAdminProducts from "../../CustomHooks/useAdminProducts";

function AdminProducts() {
  const { products, setProducts } = useGetProducts();

  const productsReadyToConsume = products.length > 0 && products;

  const {
    setActiveProductIndex,
    activeProductIndex,
    handleNextProduct,
    handlePrevProduct,
    navigate,
  } = useUtilities(products);

  const { deleteProduct } = useAdminProducts(
    products,
    setProducts,
    setActiveProductIndex
  );

  return (
    <>
      <div className="add-product">
        <button
          className="primary-cta"
          onClick={() => {
            navigate("/admin/product-add");
          }}
        >
          Add a new service
        </button>
      </div>
      <div className="form-container services">
        {products.length > 0 && (
          <div className="form-container-form">
            {productsReadyToConsume.map((product, index) => (
              <div
                key={product.product_id}
                id={product.product_id}
                className={`content ${
                  index === activeProductIndex ? "active" : ""
                }`}
              >
                <div className="product-btns">
                  <button
                    className="other-button"
                    onClick={() => {
                      navigate(`/admin/product-update/${product.product_id}`);
                    }}
                  >
                    Update service
                  </button>
                  <h3>{index + 1}</h3>
                  <button
                    className="other-button"
                    onClick={() => {
                      deleteProduct(product.product_id);
                    }}
                  >
                    Delete service
                  </button>
                </div>
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
                <input
                  type="hidden"
                  value={product.product_activity_duration}
                />
                <p>Duration: {product.product_time}</p>
                <input type="hidden" value={product.product_time} />

                <div className="product-btns">
                  <button
                    className="other-button"
                    type="button"
                    onClick={handlePrevProduct}
                  >
                    Previous
                  </button>
                  <button
                    className="other-button"
                    type="button"
                    onClick={handleNextProduct}
                  >
                    Next
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default AdminProducts;
