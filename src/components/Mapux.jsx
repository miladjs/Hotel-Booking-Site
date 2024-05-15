import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import useGeoLocation from "../hooks/useGeoLocation";
import HotelCard from "./shared/HotelCard";

const Mapux = ({ markerLocation }) => {
  const [center, setCenter] = useState([52.35, 4.86]);
  const [searchParams, setSearchParams] = useSearchParams();
  const { getPosition, error, position } = useGeoLocation();
  const params = useParams();

  const latSingel = searchParams.get("lat") || 50;
  const longSingel = searchParams.get("lon") || 50;

  useEffect(() => {
    if (params.id) {
      setCenter([latSingel, longSingel]);
    } else {
      if (markerLocation.length > 0) {
        const lat = markerLocation[0].latitude;
        const lon = markerLocation[0].longitude;
        setCenter([lat, lon]);
      }
    }
  }, [markerLocation, searchParams]);

  useEffect(() => {
    if (position) {
      setCenter([position.lat, position.lon]);
    }
  }, [position]);

  const locationHandler = () => {
    getPosition();
  };

  return (
    <div className="rounded-lg relative">
      <button
        className="absolute bg-indigo-900 text-[14px] text-cyan-50  left-5 bottom-5 py-2 px-4 rounded-lg bg-opacity-70 "
        onClick={locationHandler}
      >
        Use Your Location
      </button>
      <MapContainer center={center} zoom={12} scrollWheelZoom={false}>
        <TileLayer
          attribution="Booking Hotels"
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />

        <ChangeView position={center} />
        {markerLocation &&
          markerLocation.map((hotel) => {
            return (
              <Marker
                key={hotel.id}
                position={[hotel.latitude, hotel.longitude]}
              >
                <Popup>
                  <HotelCard hotel={hotel} />
                </Popup>
              </Marker>
            );
          })}
      </MapContainer>
    </div>
  );
};

export default Mapux;

function ChangeView({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}
