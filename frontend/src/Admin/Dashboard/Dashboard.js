import useAdminDashboard from "../../CustomHooks/useAdminDashboard";
import "./Dashboard.css";

function Dashboard() {
  const { userData, deleteOrder, deleteUser } = useAdminDashboard();

  return (
    <div className="table-container">
      {userData.map((user) => (
        <div key={user.id} id={user.id} className="user-order-info">
          <table className="user-table">
            <thead>
              <tr>
                <th colSpan="8">Carer Information</th>
              </tr>
              <tr>
                <th>Name</th>
                <th>Address</th>
                <th>Email</th>
                <th>Contact</th>
                <th>Emergency Contact</th>
                <th>Children</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{`${user.CarerFirstName} ${user.CarerLastName}`}</td>
                <td>
                  <div>
                    <p>{user.AddressLine1},</p>
                    {user.AddressLine2 && <p>{user.AddressLine2},</p>}
                    <p>{user.AddressCityTown},</p>
                    <p>{user.AddressPostcode}</p>
                  </div>
                </td>
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
                  <button
                    className="other-button"
                    onClick={() => deleteUser(user.id)}
                  >
                    <p>Delete account</p>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>

          <table className="order-table">
            <thead>
              <tr>
                <th colSpan="8">Order Information</th>
              </tr>

              {user.orders.map((hmm) =>
                hmm.order_finalised && hmm.isCompleted === 1 ? (
                  <tr key={hmm.order_id}>
                    <th>School</th>
                    <th>Activity</th>
                    <th>Which day</th>
                    <th>Year group</th>
                    <th>Runs on</th>
                    <th>Price paid</th>
                    <th>How long for</th>
                    <th>Time</th>
                    <th>Purchased on</th>
                  </tr>
                ) : (
                  <tr key={hmm.order_id}>
                    <th>No orders</th>
                  </tr>
                )
              )}
            </thead>
            {user.orders.map(
              (order) =>
                order.buyer_id &&
                order.order_finalised &&
                order.isCompleted === 1 && (
                  <tbody key={order.order_id} id={order.order_id}>
                    <tr>
                      <td>{order.product.product_school}</td>
                      <td>
                        {order.product.product_activity} for
                        {order.order_child}
                      </td>
                      {order.order_day ? (
                        <td>{order.order_day}</td>
                      ) : (
                        <td>Next term</td>
                      )}
                      <td>{order.product.product_criteria}</td>
                      <td>{order.product.product_day}</td>
                      <td>
                        £
                        {order.product.product_price *
                          order.product.product_activity_duration}
                      </td>
                      <td>
                        {order.product.product_activity_duration > 1
                          ? `${order.product.product_activity_duration} weeks`
                          : `${order.product.product_activity_duration} day`}
                      </td>
                      <td>{order.product.product_time}</td>
                      <td>{order.order_finalised}</td>
                      <td>
                        <button
                          className="other-button"
                          onClick={() => deleteOrder(order.order_id)}
                        >
                          <p>Delete order</p>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                )
            )}
          </table>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;
