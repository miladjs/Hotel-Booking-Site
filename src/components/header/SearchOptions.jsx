import { format } from "date-fns";
import { useEffect, useRef, useState } from "react";
import { DateRange } from "react-date-range";
import { CiLocationOn, CiSearch } from "react-icons/ci";
import { LuMinus, LuPlus } from "react-icons/lu";
import {
  createSearchParams,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";

const SearchOptions = ({ setShowModal }) => {
  const navigate = useNavigate();
  const [options, setOptions] = useState({
    adults: 1,
    childrens: 0,
    pets: 0,
    room: 1,
  });

  const [search, setSearch] = useState("");
  const [show, setShow] = useState(null);
  const [datePick, setDatePick] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const searchHandler = () => {
    const encodedParams = createSearchParams({
      search,
      options: JSON.stringify(options),
    });
    setShowModal(false);
    navigate({
      pathname: "/hotels",
      search: encodedParams.toString(),
    });
  };

  const optionsRef = useRef();

  const showHandler = (event, id) => {
    setShow(id);
  };

  useEffect(() => {
    function HandelClick(event) {
      if (optionsRef && !optionsRef.current?.contains(event.target)) {
        setShow(null);
      }
    }

    document.addEventListener("mousedown", HandelClick);
  }, [optionsRef]);

  const OptionsHandler = (name, option) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: option === "inc" ? prev[name] + 1 : prev[name] - 1,
      };
    });
  };

  return (
    <div
      className="flex flex-col md:flex-row flex-wrap gap-2 items-start md:items-center justify-center bg-white p-6 shadow-lg lg:shadow-none "
      ref={optionsRef}
    >
      <SearchItems
        id="where"
        title="Where"
        placeholder={search.length > 0 ? search : "add destinations"}
        icon={<CiLocationOn />}
        showHandler={showHandler}
        show={show}
      >
        <div className="absolute w-full md:top-[74px] md:left-5 bg-white left-1 top-10">
          <input
            type="text"
            className="border-2 border-indigo-950 rounded-lg py-1 px-2 "
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </SearchItems>

      <SearchItems
        id="dates"
        title="Check in"
        placeholder={format(datePick[0].startDate, "MM/dd/yyyy")}
        showHandler={showHandler}
        show={show}
      >
        <DateRange
          ranges={datePick}
          minDate={new Date()}
          onChange={(item) => setDatePick([item.selection])}
          moveRangeOnFirstSelection={true}
        />
      </SearchItems>

      <SearchItems
        id="dates"
        title="Check out"
        placeholder={format(datePick[0].endDate, "MM/dd/yyyy")}
        showHandler={showHandler}
        show={show}
      />

      <SearchItems
        id="room"
        title="Room"
        placeholder={`${options["room"]} room`}
        showHandler={showHandler}
        show={show}
      >
        <ItemOptions
          type="room"
          options={options}
          OptionsHandler={OptionsHandler}
        />
      </SearchItems>

      <SearchItems
        id="person"
        title="Person"
        placeholder={`${options["adults"]} adult / ${options["childrens"]} child / ${options["pets"]} pets`}
        showHandler={showHandler}
        show={show}
      >
        <ItemOptions
          type="adults"
          options={options}
          OptionsHandler={OptionsHandler}
        />
        <ItemOptions
          type="childrens"
          options={options}
          OptionsHandler={OptionsHandler}
        />
        <ItemOptions
          type="pets"
          options={options}
          OptionsHandler={OptionsHandler}
        />
      </SearchItems>

      <button
        onClick={searchHandler}
        className="mt-4 lg:mt-0 w-full justify-center lg:w-fit hover:animate-pulse items-center flex bg-slate-100 text-slate-900 p-3 text-[26px] rounded-lg hover:bg-slate-200 hover:text-slate-900 transition-all"
      >
        <CiSearch />
        <span className="ml-2 text-[20px] lg:hidden">Search</span>
      </button>
    </div>
  );
};

export default SearchOptions;

const ItemOptions = ({ type, OptionsHandler, options }) => {
  return (
    <div className="grid-cols-[1fr_1fr] grid items-center gap-8 px-2 text-[14px]">
      <b className="text-[14px]">{type}</b>
      <div className="grid grid-cols-[1fr_1fr_1fr] items-center gap-3">
        <button
          className="bg-white p-2 rounded-lg disabled:opacity-30"
          onClick={() => OptionsHandler(type, "dec")}
          disabled={options[type] <= 0}
        >
          <LuMinus />
        </button>
        <b>{options[type]}</b>
        <button
          className="bg-white p-2 rounded-lg "
          onClick={() => OptionsHandler(type, "inc")}
        >
          <LuPlus />
        </button>
      </div>
    </div>
  );
};

const SearchItems = ({
  id,
  title,
  placeholder,
  icon,
  children,
  showHandler,
  show,
}) => {
  return (
    <>
      <div
        className="flex relative flex-col  cursor-pointer px-8 py-3 rounded-lg hover:bg-slate-100"
        onClick={(e) => showHandler(e, id)}
      >
        <b className="text-[16px] mb-0.5">{title}</b>
        <span className="flex gap-1 items-center text-slate-400 text-[16px]">
          {icon && icon}
          <span>{placeholder}</span>
        </span>
        {children && show === id ? (
          id === "where" ? (
            children
          ) : (
            <div className="bg-slate-100 left-5 z-[2000] absolute top-20 p-3 rounded-2xl min-w-fit flex flex-col gap-3 ">
              {children}
            </div>
          )
        ) : null}
      </div>
    </>
  );
};
