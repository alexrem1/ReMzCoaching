import { useGetOrders } from "../../CustomHooks/useGetOrders";

function MyOrders() {
  const { myOrders } = useGetOrders();

  return (
    <div>
      <h3>My Orders</h3>

      {myOrders.map((myOrder) => (
        <div key={myOrder.order_id}>
          <>
            <p>Actvity: {myOrder.product_activity}</p>
            <p>School: {myOrder.product_school}</p>
            <p>Time: {myOrder.product_time}</p>
            <p>Description: {myOrder.product_description}</p>

            {myOrder.isCompleted === 1 && (
              <p>
                You have paid £
                {myOrder.product_price * myOrder.product_activity_duration} for
                this session.
              </p>
            )}
          </>
          <br />
        </div>
      ))}
    </div>
  );
}

export default MyOrders;
