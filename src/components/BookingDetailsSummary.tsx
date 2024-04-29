import { HotelType } from "../types/HotelType";

type Props = {
  checkIn: Date;
  checkOut: Date;
  audltCount: number;
  childCount: number;
  numberOfNights: number;
  hotel: HotelType;
};

const BookingDetailsSummary = ({
  checkIn,
  checkOut,
  audltCount,
  childCount,
  numberOfNights,
  hotel,
}: Props) => {
  return (
    <div className="grid p-5 border rounded-lg gap04 border-slate-300 h-fit">
      <h2 className="text-xl font-bold">Your Booking Details</h2>
      <div className="py-2 border-b">
        Location:
        <div className="font-b0ld">
          {`${hotel.name}`},{`${hotel.city}`},{`${hotel.country}`}
        </div>
      </div>
      <div className="flex justify-between">
        <div>
          Check-in
          <div className="font-bold">{checkIn.toDateString()}</div>
        </div>
        <div>
          Check-out
          <div className="font-bold">{checkOut.toDateString()}</div>
        </div>
      </div>
      <div className="py-2 border-t border-b ">
        Total lenght of stay:
        <div className="font-bold">{numberOfNights} nights</div>
      </div>
      <div>
        Guests
        <div className="font-bold">
          {audltCount} adults & {childCount} children
        </div>
      </div>
    </div>
  );
};

export default BookingDetailsSummary;
