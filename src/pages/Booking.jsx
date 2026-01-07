import { useLocation } from "react-router-dom";

import BookingDetail from "../features/bookings/BookingDetail";
import useBooking from "../features/bookings/useBooking";
import Spinner from "../ui/Spinner";

function Booking() {
  return <BookingDetail />;
}

export default Booking;
