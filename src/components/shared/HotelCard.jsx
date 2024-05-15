import { IoMdHeartEmpty, IoMdRemoveCircleOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import { useBookmark } from "../../context/BookmarkContext";

const HotelCard = ({ hotel }) => {
  if (!hotel) {
    return <div>loading...</div>;
  }
  const { bookmark, dispatch } = useBookmark();

  const isExist = bookmark.find((item) => item.id === hotel.id);

  const addHandler = () => {
    dispatch({ type: "add_bookmark", payload: hotel });
  };
  const removekHandler = () => {
    dispatch({ type: "remove_bookmark", payload: hotel });
  };

  console.log(hotel);

  return (
    <div className="p-4 border rounded-lg grid grid-rows relative">
      <div className="absolute left-0 top-8 flex items-center justify-between w-full px-7">
        <div className="text-[12px] flex gap-1 ">
          <span className="bg-indigo-800 bg-opacity-60 text-white py-1 px-3 rounded-md">
            {hotel?.room_type}
          </span>
          <span className="bg-black bg-opacity-60 text-white py-1 px-3 rounded-md">
            {hotel?.bed_type}
          </span>
        </div>
        {isExist ? (
          <button
            onClick={removekHandler}
            className="bg-red-400 p-1 rounded-lg bg-opacity-70 hover:bg-opacity-100 transition-all"
          >
            <IoMdRemoveCircleOutline />
          </button>
        ) : (
          <button
            onClick={addHandler}
            className="bg-white p-1 rounded-lg bg-opacity-70 hover:bg-opacity-100 transition-all"
          >
            <IoMdHeartEmpty />
          </button>
        )}
      </div>

      <img
        className="rounded-lg h-[180px] w-full object-cover mb-3"
        src="/imagenot.png"
        alt={hotel?.name}
      />
      <h2 className="font-bold text-[18px] mb-0">
        <Link to={`/hotels/${hotel?.id}`}>{hotel.name}</Link>
      </h2>
      <span className="truncate text-slate-400 text-[14px]">
        <Link to={`/hotels/${hotel?.id}`}>{hotel.host_location}</Link>
      </span>
      <div className="flex items-center gap-1 text-[16px]">
        <b className="flex items-center font-mono">€{hotel.price}</b>
        <span className="text-slate-400 text-[15px]">night</span>
      </div>
    </div>
  );
};

export default HotelCard;
