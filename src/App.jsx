import { useState } from "react";

import Header from "./components/Header";
import Home from "./pages/Home";
import { Outlet, NavLink } from "react-router-dom";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Header />
      <div className="container">
        <Home />
        {/* <Outlet /> */}
      </div>
      <Footer />
    </>
  );
}

export default App;