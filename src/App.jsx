import { useState } from "react";

import Header from "./components/Header";
import { Outlet, NavLink } from "react-router-dom";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Header />
      <div className="container">
        {/* 網頁主要區塊 */}
        {/* <Outlet /> */}
      </div>
      <Footer />
    </>
  );
}

export default App;