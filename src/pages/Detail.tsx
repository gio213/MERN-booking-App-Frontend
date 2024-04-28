import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "../api/api-client.ts";
import { AiFillStar } from "react-icons/ai";
import ImageGallery from "react-image-gallery";
import GuestInfo from "../forms/GuestInfoForm/GuestInfo.tsx";

const Detail = () => {
  const { hotelId } = useParams();

  const { data: hotel } = useQuery(
    "fetchHotelById",
    () => apiClient.fetchHotelById(hotelId as string),
    {
      enabled: !!hotelId,
    }
  );
  if (!hotel) {
    return <></>;
  }

  const images = hotel.imageUrls.map((image) => ({
    original: image,
    thumbnail: image,
  }));

  return (
    <div className="space-y-6">
      <div>
        <span className="flex">
          {Array.from({ length: hotel?.starRating }).map(() => (
            <AiFillStar className="fill-yellow-400" />
          ))}
        </span>
        <h1 className="text-3xl font-bold">{hotel.name}</h1>
      </div>
      <div className="w-[650px]">
        <ImageGallery
          showBullets={true}
          showPlayButton={false}
          showThumbnails={false}
          items={images}
        />
      </div>
      <div className="grid grid-cols-1 gap-2 lg:grid-cols-4">
        {hotel.facilities.map((facility, index) => (
          <div key={index} className="p-3 border rounded-sm border-slate-300">
            {facility}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr]">
        <div className="whitespace-pre-line">{hotel.description}</div>
        <div className="h-fit">
          <GuestInfo pricePerNight={hotel.pricePerNight} hotelId={hotel._id} />
        </div>
      </div>
    </div>
  );
};

export default Detail;
