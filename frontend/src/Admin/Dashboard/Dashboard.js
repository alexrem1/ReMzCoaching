import useAdminDashboard from "../../CustomHooks/useAdminDashboard";
import "./Dashboard.css";

function Dashboard() {
  const { userData, deleteOrder, deleteUser } = useAdminDashboard();

  console.log(userData);

  return (
    <div className="table-container">
      {userData.map((user) => (
        <div key={user.id} style={{ marginBottom: "50px" }}>
          <table className="user-table">
            <thead>
              <tr>
                <th colSpan="8">User Information</th>
              </tr>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Contact</th>
                <th>Emergency Contact</th>
                <th>Children</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{`${user.CarerFirstName} ${user.CarerLastName}`}</td>
                <td>{user.Email}</td>
                <td>{user.ContactNumber}</td>
                <td>{user.EmergencyContactNumber}</td>
                <td>
                  <p>
                    {`${user.FirstChildFirstName} ${user.FirstChildLastName} - ${user.FirstChildDOB} (${user.FirstChildYearGroup})`}
                  </p>
                  <p>
                    {user.SecondChildFirstName &&
                      ` and ${user.SecondChildFirstName} ${user.SecondChildLastName} - ${user.SecondChildDOB} (${user.SecondChildYearGroup})`}
                  </p>
                </td>
                <td>
                  <button onClick={() => deleteUser(user.id)}>Delete</button>
                </td>
              </tr>
            </tbody>
          </table>

          <table className="order-table">
            <thead>
              <tr>
                <th colSpan="8">Order Information</th>
              </tr>
              {user.orders[0].buyer_id && (
                <tr>
                  <th>School</th>
                  <th>Activity</th>
                  <th>Year group</th>
                  <th>Runs on</th>
                  <th>Price paid</th>
                  <th>How long for</th>
                  <th>Time</th>
                  <th>Action</th>
                </tr>
              )}
            </thead>
            <tbody>
              {user.orders.map((order) => (
                <tr key={order.order_id}>
                  {order.isCompleted === 1 && order.buyer_id ? (
                    <>
                      <td>{order.product.product_school}</td>
                      <td>{order.product.product_activity}</td>
                      <td>{order.product.product_criteria}</td>
                      <td>{order.product.product_day}</td>
                      <td>
                        {order.product.product_price *
                          order.product.product_activity_duration}
                      </td>
                      <td>
                        {order.product.product_activity_duration > 1
                          ? `${order.product.product_activity_duration} weeks`
                          : `${order.product.product_activity_duration} day`}
                      </td>
                      <td>{order.product.product_time}</td>
                      <td>
                        <button onClick={() => deleteOrder(order.order_id)}>
                          Delete
                        </button>
                      </td>
                    </>
                  ) : (
                    <td>No orders...</td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;
