import "./Profile.css";
import { useState } from "react"; // Import useState
import MyOrders from "../Orders/MyOrders";
import UserDetails from "../UserDetails/UserDetails";

function Profile() {
  const [showDetails, setShowDetails] = useState(true); // State to control which section to show

  return (
    <div>
      {/* Buttons to toggle between showing details and bookings */}
      <div className="toggle-buttons">
        <button
          className={showDetails ? "primary-cta" : ""}
          onClick={() => setShowDetails(true)}
        >
          My Details
        </button>
        <button
          className={!showDetails ? "primary-cta" : ""}
          onClick={() => setShowDetails(false)}
        >
          My Orders
        </button>
      </div>

      {/* Conditional rendering based on the showDetails state */}
      {showDetails ? ( // Show user details
        <UserDetails />
      ) : (
        // Show user bookings
        <MyOrders />
      )}
    </div>
  );
}

export default Profile;
