import useAdminDashboard from "../../CustomHooks/useAdminDashboard";
import "./Dashboard.css";

function Dashboard() {
  const { userData, deleteOrder, deleteUser } = useAdminDashboard();

  return (
    <div className="dashboard-container">
      {userData.map((user) => (
        <div key={user.id} className="user-container">
          <div className="user-info">
            <h2 className="section-title">
              Carer Information for{" "}
              {`${user.CarerFirstName} ${user.CarerLastName}`}
            </h2>
            <div className="user-details">
              <p>
                <strong>Name:</strong>{" "}
                {`${user.CarerFirstName} ${user.CarerLastName}`}
              </p>
              <p>
                <strong>Address:</strong> {user.AddressLine1},{" "}
                {user.AddressLine2}, {user.AddressCityTown},{" "}
                {user.AddressPostcode}
              </p>
              <p>
                <strong>Email:</strong> {user.Email}
              </p>
              <p>
                <strong>Contact:</strong> {user.ContactNumber}
              </p>
              <p>
                <strong>Emergency Contact:</strong>{" "}
                {user.EmergencyContactNumber}
              </p>
              <p>
                <strong>Children:</strong>
              </p>
              <ul>
                <li>{`${user.FirstChildFirstName} ${user.FirstChildLastName} - ${user.FirstChildDOB} (${user.FirstChildYearGroup})`}</li>
                {user.SecondChildFirstName && (
                  <li>{`${user.SecondChildFirstName} ${user.SecondChildLastName} - ${user.SecondChildDOB} (${user.SecondChildYearGroup})`}</li>
                )}
              </ul>
              <button
                className="other-button"
                onClick={() => deleteUser(user.id)}
              >
                Delete account
              </button>
            </div>
          </div>

          <div className="order-info">
            <h2 className="section-title">
              Order Information for{" "}
              {`${user.CarerFirstName} ${user.CarerLastName}`}
            </h2>
            {user.orders.some((order) => order.isCompleted === 1) ? (
              user.orders.map(
                (order) =>
                  order.isCompleted === 1 && (
                    <div key={order.order_id} className="order-item">
                      <p>
                        <strong>School:</strong> {order.product.product_school}
                      </p>
                      <p>
                        <strong>Activity:</strong>{" "}
                        {order.product.product_activity} for {order.order_child}
                      </p>
                      <p>
                        <strong>Which day:</strong>{" "}
                        {order.order_day ? order.order_day : "Next term"}
                      </p>
                      <p>
                        <strong>Year group:</strong>{" "}
                        {order.product.product_criteria}
                      </p>
                      <p>
                        <strong>Runs on:</strong> {order.product.product_day}
                      </p>
                      <p>
                        <strong>Price paid:</strong> £
                        {order.product.product_price *
                          order.product.product_activity_duration}
                      </p>
                      <p>
                        <strong>How long for:</strong>{" "}
                        {order.product.product_activity_duration > 1
                          ? `${order.product.product_activity_duration} weeks`
                          : `${order.product.product_activity_duration} day`}
                      </p>
                      <p>
                        <strong>Time:</strong> {order.product.product_time}
                      </p>
                      <p>
                        <strong>Purchased on:</strong> {order.order_finalised}
                      </p>
                      <button
                        className="other-button"
                        onClick={() => deleteOrder(order.order_id)}
                      >
                        Delete order
                      </button>
                    </div>
                  )
              )
            ) : (
              <div className="order-item">
                <p className="no-orders">No Orders</p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;
