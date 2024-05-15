import {
  createSearchParams,
  useParams,
  useSearchParams,
} from "react-router-dom";
import useFetch from "../hooks/useFetch";
import HotelCard from "./shared/HotelCard";
import { useEffect } from "react";

const Hotel = () => {
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const { data, isLoading } = useFetch("/hotels", `id=${params.id}`);

  useEffect(() => {
    if (data[0]) {
      const enon = createSearchParams({
        lat: data[0]?.latitude,
        lon: data[0]?.longitude,
      });
      setSearchParams(enon);
    }
  }, [data, searchParams]);

  if (isLoading) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <HotelCard hotel={data[0]} />
    </div>
  );
};

export default Hotel;
