import { useHotels } from "../context/HotelsContext";
import HotelCard from "./shared/HotelCard";

const Hotels = () => {
  const [displayHotel, isLoading] = useHotels();

  if (isLoading) {
    return <div>loading...</div>;
  }

  if (displayHotel.length < 1) {
    return <div>Not found..</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {displayHotel &&
        displayHotel.map((hotel) => {
          return <HotelCard key={hotel.id} hotel={hotel} />;
        })}
    </div>
  );
};

export default Hotels;
