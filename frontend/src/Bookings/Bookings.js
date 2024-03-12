import { ConfigProvider } from "antd";
import UserBooking from "./UserBooking";
function Bookings() {
  return (
    <div>
      Bookings
      <br />
      <ConfigProvider>
        <UserBooking />
      </ConfigProvider>
    </div>
  );
}

export default Bookings;
