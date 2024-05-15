import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./Global.scss";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import MainLayout from "./components/layout/MainLayout.jsx";
import { BrowserRouter } from "react-router-dom";
import HotelsProvider from "./context/HotelsContext.jsx";
import "leaflet/dist/leaflet.css";
import BookmarkProvider from "./context/BookmarkContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>

  <BrowserRouter>
    <BookmarkProvider>
      <HotelsProvider>
        <MainLayout>
          <App />
        </MainLayout>
      </HotelsProvider>
    </BookmarkProvider>
  </BrowserRouter>
  // </React.StrictMode>
);
