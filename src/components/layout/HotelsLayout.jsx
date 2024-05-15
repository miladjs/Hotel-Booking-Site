import { Outlet } from "react-router-dom";
import Mapux from "../Mapux";
import { useHotels } from "../../context/HotelsContext";

const HotelsLayout = () => {
  const [displayHotel] = useHotels();
  return (
    <div className="grid lg:grid-cols-2 md:grid-cols-1 min-h-full gap-5 items-start">
      <div>
        <Outlet />
      </div>
      <div className="order-first md:order-last">
        <Mapux markerLocation={displayHotel} />
      </div>
    </div>
  );
};

export default HotelsLayout;
