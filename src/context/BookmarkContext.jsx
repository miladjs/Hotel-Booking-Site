import { createContext, useContext, useEffect, useReducer } from "react";

const bookmarkContext = createContext();

const bookMarkReducer = (state, action) => {
  switch (action.type) {
    case "add_bookmark":
      if (!state?.find((item) => item.id === action.payload.id)) {
        return [...state, action.payload];
      }
      return state;
    case "remove_bookmark":
      return state?.filter((item) => item.id != action.payload.id);
    case "list_bookmark":
      return state;
    default:
      return state;
  }
};
const initialState = getLocalstorage();

const BookmarkProvider = ({ children }) => {
  const [bookmark, dispatch] = useReducer(bookMarkReducer, initialState);

  useEffect(() => {
    localStorage.setItem("bookmark", JSON.stringify(bookmark));
  }, [bookmark]);

  return (
    <bookmarkContext.Provider value={{ bookmark, dispatch }}>
      {children}
    </bookmarkContext.Provider>
  );
};

export default BookmarkProvider;

function getLocalstorage() {
  const getBookmark = localStorage.getItem("bookmark");
  return getBookmark ? JSON.parse(getBookmark) : [];
}

function useBookmark() {
  return useContext(bookmarkContext);
}

export { useBookmark };
