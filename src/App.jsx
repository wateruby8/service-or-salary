import { useState } from "react";

import Navbar from "./components/Navbar";
import { Outlet, NavLink } from "react-router-dom";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default App;