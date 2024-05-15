import Footer from "../footer/Footer";
import Header from "../header/Header";

const MainLayout = ({ children }) => {
  return (
    <div className="container">
      <div className="min-h-screen grid grid-rows-[auto_1fr_auto] gap-7">
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
