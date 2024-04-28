import { HotelType } from "@/types/HotelType";
import { AiFillStar } from "react-icons/ai";
import { Link } from "react-router-dom";
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";

type Props = {
  hotel: HotelType;
};

const SearchResultCard = ({ hotel }: Props) => {
  const images = hotel.imageUrls.map((image) => ({
    original: image,
  }));

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[2fr_3fr] border border-slate-300 rounded-lg p-8 gap-8">
      <div className="w-full h-[200px]">
        <ImageGallery
          showBullets={true}
          showPlayButton={false}
          showThumbnails={false}
          items={images}
        />
      </div>
      <div className="grid grid-rows-[1fr_2fr_1fr]">
        <div>
          <div className="flex items-center">
            <span className="flex">
              {Array.from({ length: hotel.starRating }).map(() => (
                <AiFillStar className="fill-yellow-400" />
              ))}
            </span>
            <span className="ml-1 text-sm">{hotel.type}</span>
          </div>
          <Link
            to={`/detail/${hotel._id}`}
            className="text-2xl font-bold cursor-pointer"
          >
            {hotel.name}
          </Link>
        </div>

        <div>
          <div className="line-clamp-4">{hotel.description}</div>
        </div>

        <div className="grid items-end grid-cols-2 whitespace-nowrap">
          <div className="flex items-center gap-1">
            {hotel.facilities.slice(0, 3).map((facility) => (
              <span className="p-2 text-xs font-bold rounded-lg bg-slate-300 whitespace-nowrap">
                {facility}
              </span>
            ))}
            <span className="text-sm">
              {hotel.facilities.length > 3 &&
                `+${hotel.facilities.length - 3} more`}
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between pt-2">
          <span className="font-bold text-green-900">
            €{hotel.pricePerNight} Per Night
          </span>
          <Link
            to={`/detail/${hotel._id}`}
            className="h-full p-2 font-bold text-white bg-blue-600 text-md max-w-fit hover:bg-blue-500"
          >
            View More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchResultCard;
