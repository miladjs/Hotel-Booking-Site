import { useState } from "react";

const useGeoLocation = () => {
  const [position, setPosition] = useState();
  const [error, setError] = useState();

  const getPosition = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        });
      },
      (error) => {
        setError(error.message);
      }
    );
  };

  return { position, getPosition, error };
};

export default useGeoLocation;
