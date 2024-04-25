import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import Announcement from "../pages/Announcement/Announcement";

const AppRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/announcement" element={<Announcement />} />
    </Routes>
  );
};

export default AppRoute;
