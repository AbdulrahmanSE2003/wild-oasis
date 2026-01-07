import { useEffect, useState } from "react";
import styled from "styled-components";

import Spinner from "../../ui/Spinner";
import { formatCurrency } from "../../utils/helpers";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Checkbox from "../../ui/Checkbox";

import BookingDataBox from "../../features/bookings/BookingDataBox";

import useBooking from "../../features/bookings/useBooking";
import { useMoveBack } from "../../hooks/useMoveBack";
import { useSettings } from "../../features/settings/useSettings";
import { useCheckin } from "./useCheckin";

const Box = styled.div`
  padding: 1rem 2rem;
`;

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);

  const { booking, isLoading } = useBooking();
  const { checkin, isCheckingIn } = useCheckin();
  const moveBack = useMoveBack();
  const { isLoading: isLoadingSettings, settings } = useSettings();

  // Can't use as initial state, because booking will still be loading
  useEffect(() => setConfirmPaid(booking?.isPaid ?? false), [booking]);

  if (isLoading || isLoadingSettings) return <Spinner />;

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  const optionalBreakfastPrice =
    numNights * settings.breakfastPrice * numGuests;

  const displayedTotalPrice =
    !hasBreakfast && addBreakfast
      ? `${totalPrice + optionalBreakfastPrice} `
      : totalPrice;

  function handleCheckin() {
    if (!confirmPaid) return;

    const payload = {
      bookingId,
      breakfast: hasBreakfast
        ? {}
        : addBreakfast
        ? {
            hasBreakfast: true,
            extrasPrice: optionalBreakfastPrice,
            totalPrice: totalPrice + optionalBreakfastPrice,
          }
        : { hasBreakfast: false },
    };

    checkin(payload);
  }

  return (
    <>
      <Row type="horizontal">
        <Heading type="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <Box>
          <Checkbox
            checked={confirmPaid}
            onChange={() => setConfirmPaid((c) => !c)}
            disabled={confirmPaid || isCheckingIn}
            id="confirm"
          >
            I confirm that {guests.fullName} has paid the total amount of{" "}
            {formatCurrency(displayedTotalPrice)}
          </Checkbox>
        </Box>

        {!hasBreakfast && (
          <Box>
            <Checkbox
              checked={addBreakfast}
              onChange={() => {
                setAddBreakfast((add) => !add);
                setConfirmPaid(false); // force reconfirm when toggling breakfast
              }}
            >
              Want to add breakfast for {formatCurrency(optionalBreakfastPrice)}
            </Checkbox>
          </Box>
        )}
      </div>

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid || isCheckingIn}>
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
