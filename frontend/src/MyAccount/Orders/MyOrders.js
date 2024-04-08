import { useGetOrders } from "../../CustomHooks/useGetOrders";
import useUtilities from "../../CustomHooks/useUtilities";

function MyOrders() {
  const { myOrders } = useGetOrders();

  const { activeProductIndex, handleNextProduct, handlePrevProduct } =
    useUtilities(myOrders);

  return myOrders.length > 0 ? (
    <div className="form-container orders">
      <div className="form-container-form">
        {myOrders.map((myOrder, index) => (
          <div
            key={myOrder.order_id}
            className={`content ${
              index === activeProductIndex ? "active" : ""
            }`}
          >
            <p>Order {index + 1}</p>
            <p>Order made on {myOrder.order_finalised}</p>
            <p>{myOrder.product_activity}</p>
            <p>{myOrder.product_school}</p>
            <p>Time: {myOrder.product_time}</p>
            {myOrder.order_day ? (
              <p>
                {myOrder.order_child} is booked in for {myOrder.order_day} and
                you made this booking on {myOrder.order_finalised}
              </p>
            ) : (
              <p>
                {myOrder.order_child} is booked in for{" "}
                {myOrder.product_description}
              </p>
            )}
            <p>
              You have paid £
              {myOrder.product_price * myOrder.product_activity_duration} for
              this session.
            </p>
            <p>
              A confirmation email has been sent to you. Please check your
              junk/spam folders if it's not in your inbox
            </p>
          </div>
        ))}
        <div
          className="product-btns"
          style={myOrders.length < 2 ? { display: "none" } : {}}
        >
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
    </div>
  ) : (
    <div className="form-container">
      <div className="form-container-form">
        <div className="content">
          <p>You have not made an order with us yet.</p>
        </div>
      </div>
    </div>
  );
}

export default MyOrders;
