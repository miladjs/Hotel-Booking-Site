import { useSearchParams } from "react-router-dom";
import useFetch from "./../hooks/useFetch";
import { useEffect, useState } from "react";

import { createContext, useContext } from "react";

const HotelsContext = createContext();

const HotelsProvider = ({ children }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const options = JSON.parse(searchParams.get("options"));
  const search = searchParams.get("search");
  const [displayHotel, setDisplayHotel] = useState([]);

  const { data, isLoading } = useFetch(
    "/hotels",
    `accommodates_gte=${options?.room || 1}`
  );

  useEffect(() => {
    setDisplayHotel([]);
    data.filter((hotel) => {
      if (search?.length > 0) {
        if (hotel.host_location?.toLowerCase().includes(search)) {
          setDisplayHotel((prev) => [...prev, hotel]);
        }
      } else {
        setDisplayHotel(data);
      }
    });
  }, [search, data]);

  return (
    <HotelsContext.Provider value={[displayHotel, isLoading]}>
      {children}
    </HotelsContext.Provider>
  );
};

export default HotelsProvider;

export function useHotels() {
  return useContext(HotelsContext);
}
