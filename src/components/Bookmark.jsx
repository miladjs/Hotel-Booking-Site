import { useBookmark } from "../context/BookmarkContext";
import HotelCard from "./shared/HotelCard";

const Bookmark = () => {
  const { bookmark } = useBookmark();

  if (bookmark.length < 1) {
    return <div className="flex justify-center">Bookmark Empty...</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 md:grid-cols-2">
      {bookmark &&
        bookmark.map((hotel) => {
          return <HotelCard key={hotel.id} hotel={hotel} />;
        })}
    </div>
  );
};

export default Bookmark;
