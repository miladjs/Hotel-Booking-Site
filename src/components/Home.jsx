import useFetch from "./../hooks/useFetch";
import HotelCard from "./shared/HotelCard";

const Home = () => {
  const { data, isLoading } = useFetch("/hotels", "_limit=24");

  if (isLoading) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-4">
        {data &&
          data.map((hotel) => {
            return <HotelCard key={hotel.id} hotel={hotel} />;
          })}
      </div>
    </div>
  );
};

export default Home;
