import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Search from "./components/Search";
import Hotel from "./components/Hotel";
import Aboutus from "./components/Aboutus";
import { Blog } from "./components/Blog";
import HotelsLayout from "./components/layout/HotelsLayout";
import Hotels from "./components/Hotels";
import Bookmark from "./components/Bookmark";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/hotels" element={<HotelsLayout />}>
        <Route index element={<Hotels />} />
        <Route path=":id" element={<Hotel />} />
      </Route>
      <Route path="/about" element={<Aboutus />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/bookmark" element={<Bookmark />} />
    </Routes>
  );
}

export default App;
