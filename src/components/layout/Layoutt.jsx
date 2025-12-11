import { Outlet } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import Foot from "./Foot.jsx";

const Layoutt = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Foot />
    </div>
  );
};

export default Layoutt;
