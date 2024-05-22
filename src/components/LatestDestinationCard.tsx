import { HotelType } from "@/types/HotelType";
import { Link } from "react-router-dom";

type Props = {
  hotel: HotelType;
};

const LatestDestinationCard = ({ hotel }: Props) => {
  return (
    <Link
      to={`/detail/${hotel._id}`}
      className="relative overflow-hidden rounded-md cursor-pointer"
    >
      <div className="h-[300px]">
        <img
          src={hotel.imageUrls[0]}
          alt="hotel image"
          className="object-cover object-center w-full h-full"
        />
      </div>
      <div className="absolute bottom-0 w-full p-4 bg-black bg-opacity-50 rounded-b-md">
        <span className="text-white font-bold tracking-tight text-3xl">
          {hotel.name}
        </span>
      </div>
    </Link>
  );
};

export default LatestDestinationCard;
