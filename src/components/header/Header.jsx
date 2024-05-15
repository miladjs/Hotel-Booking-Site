import { Link, NavLink } from "react-router-dom";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { SiHotelsdotcom } from "react-icons/si";
import SearchOptions from "./SearchOptions";
import { RiHotelLine } from "react-icons/ri";
import { useHotels } from "../../context/HotelsContext";
import { useBookmark } from "../../context/BookmarkContext";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { FaSearch } from "react-icons/fa";

const Header = () => {
  const [displayHotel, isLoading] = useHotels();
  const { bookmark, dispatch } = useBookmark();
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="mt-8 ">
      <div className="flex md:flex-col lg:flex-row md:items-start flex-col items-center justify-between border-b pb-4">
        <div className="flex items-center space-x-2 mb-7 md:md-0 ">
          <SiHotelsdotcom className="text-[22px]" />
          <Link to="/" className="flex items-center mt-0 relative text-[22px]">
            <span>Booking</span>
            <b>Hotels</b>
          </Link>
        </div>
        <div className="flex items-center space-x-6 font-medium flex-col md:flex-row w-full justify-between lg:justify-end">
          <ul className="space-x-6">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/hotels">hotels</NavLink>
            <NavLink to="/blog">blog</NavLink>
            <NavLink to="/about">About us</NavLink>
          </ul>
          <Link
            className="bg-indigo-950 text-white py-2 px-4 rounded-2xl flex items-center mt-7 md:mt-0"
            to="/bookmark"
          >
            <MdOutlineFavoriteBorder />
            <span className="ml-1">bookmark</span>
            {bookmark?.length < 1 ? null : (
              <span className="bg-white text-indigo-950 py-0 px-2 rounded-lg font-mono ml-2">
                {bookmark?.length}
              </span>
            )}
          </Link>
        </div>
      </div>
      <div className="border-b py-5 flex flex-col md:flex-row items-center justify-between">
        <button
          onClick={() => setShowModal(true)}
          className="bg-indigo-700 gap-2 text-white py-2 px-4 rounded-2xl flex items-center mt-2 md:mt-0 lg:hidden"
        >
          <FaSearch />
          <span>Search Hotels</span>
        </button>
        {showModal ? (
          <ModalPop setShowModal={setShowModal} />
        ) : (
          <div className="hidden lg:block">
            <SearchOptions setShowModal={setShowModal} />
          </div>
        )}
        <div className="flex items-center gap-1.5 order-first md:order-last mb-4 md:mb-0">
          <RiHotelLine />
          <b className="text-[22px]">{displayHotel?.length}</b>
          <span>items found</span>
        </div>
      </div>
    </div>
  );
};

export default Header;

const ModalPop = ({ setShowModal }) => {
  return (
    <div className="fixed bg-white bg-opacity-90 h-full top-0 left-0 w-full z-[3000]">
      <button
        className="bg-slate-500 text-white mt-4 ml-4 z-[4000] p-2 text-[20px] rounded-lg absolute"
        onClick={() => setShowModal(false)}
      >
        <IoMdClose />
      </button>
      <div className="flex items-center justify-center h-full w-full flex-col z-[3000]">
        <SearchOptions />
      </div>
    </div>
  );
};
