import AdminProducts from "./AdminProducts/AdminProducts";
import Dashboard from "./Dashboard/Dashboard";
import { useState } from "react";

function UserOrders() {
  const [showDetails, setShowDetails] = useState(true); // State to control which section to show
  return (
    <>
      {/* Buttons to toggle between showing details and bookings */}
      <div className="toggle-buttons">
        <button
          className={showDetails ? "primary-cta active" : "primary-cta"}
          onClick={() => setShowDetails(true)}
        >
          <p>Dashboard</p>
        </button>
        <button
          className={!showDetails ? "primary-cta active" : "primary-cta"}
          onClick={() => setShowDetails(false)}
        >
          <p>Services</p>
        </button>
      </div>
      {showDetails ? <Dashboard /> : <AdminProducts />}
    </>
  );
}

export default UserOrders;
