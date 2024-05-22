import { useQuery } from "react-query";
import * as apiClient from "../api/api-client";
import LatestDestinationCard from "../components/LatestDestinationCard";
const Home = () => {
  const { data: hotels } = useQuery("fetchQuery", () =>
    apiClient.fetchHotels()
  );

  const topRowHotels = hotels?.slice(0, 2) || [];
  const bottomRowHotels = hotels?.slice(2) || [];

  return (
    <div className="space-y-3">
      <h2 className="text-3xl font-bold">Latest Destinations</h2>
      <p>Monst recent destinations added by our hosts</p>
      <div className="grid gap-4">
        <div className="grid gap-4 md:grid-cols-2 cols-1">
          {topRowHotels.map((hotel, index) => (
            <LatestDestinationCard key={index} hotel={hotel} />
          ))}
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {bottomRowHotels.map((hotel, index) => (
            <LatestDestinationCard key={index} hotel={hotel} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
