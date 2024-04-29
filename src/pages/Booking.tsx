import { useQuery } from "react-query";
import * as apiClient from "../api/api-client";
import BookingForm from "../components/BookingForm";
import { useSearchContext } from "../context/SearchContext";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import BookingDetailsSummary from "../components/BookingDetailsSummary";

const Booking = () => {
  const search = useSearchContext();
  const { hotelId } = useParams();

  const [numberOfNights, setNumberOfNights] = useState<number>(0);

  useEffect(() => {
    if (search.checkIn && search.checkOut) {
      const nights =
        Math.abs(search.checkOut.getTime() - search.checkIn.getTime()) /
        (1000 * 60 * 60 * 24);
      setNumberOfNights(Math.ceil(nights));
    }
  }, [search.checkIn, search.checkOut, setNumberOfNights]);

  const { data: hotel } = useQuery(
    "fetchHotelById",
    () => apiClient.fetchHotelById(hotelId as string),
    {
      enabled: !!hotelId,
    }
  );

  const { data: currentUser } = useQuery(
    "fetchCurrentUser",
    apiClient.fetchCurrentUser
  );

  if (!hotel) {
    return <></>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr]">
      <BookingDetailsSummary
        checkIn={search.checkIn}
        checkOut={search.checkOut}
        childCount={search.childCount}
        audltCount={search.adultCount}
        numberOfNights={numberOfNights}
        hotel={hotel}
      />
      {currentUser && <BookingForm currentUser={currentUser} />}
    </div>
  );
};

export default Booking;
