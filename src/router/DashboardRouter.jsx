import React from "react";
import { Route, Routes } from "react-router-dom";
import AddPaletas from "../components/AddPaletas";
import Home from "../components/Home";

const DashboardRouter = () => {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/addPaletas" element={<AddPaletas />} />
    </Routes>
  );
};

export default DashboardRouter;
