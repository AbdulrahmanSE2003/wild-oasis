import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";

export default function Stats({
  bookings,
  confirmedStays,
  numDays,
  cabinCount,
}) {
  // 1. no.of bookings
  const noBookings = bookings?.length;

  // 2. total sales
  const sales = bookings?.reduce((acc, cur) => acc + cur.totalPrice, 0);

  // 3. no.of stays
  const checkins = confirmedStays?.length;

  // 4. occupancy rate
  const occupancyRate =
    confirmedStays?.reduce((acc, cur) => acc + cur.numNights, 0) /
    (numDays * cabinCount);

  return (
    <>
      <Stat
        title="Bookings"
        value={noBookings}
        color="blue"
        icon={<HiOutlineBriefcase />}
      />
      <Stat
        title="sales"
        value={formatCurrency(sales)}
        color="green"
        icon={<HiOutlineBanknotes />}
      />
      <Stat
        title="Check ins"
        value={checkins}
        color="indigo"
        icon={<HiOutlineCalendarDays />}
      />
      <Stat
        title="Occupancy Rate"
        value={Math.round(occupancyRate * 100) + "%"}
        color="yellow"
        icon={<HiOutlineChartBar />}
      />
    </>
  );
}
