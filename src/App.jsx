import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import About from "./pages/About";
import BuyDemo from "./pages/BuyDemo";
import BuyGuide from "./pages/BuyGuide";
import BuyList from "./pages/BuyList";
import ForgetPassword from "./pages/ForgetPassword";
import MemberCalendar from "./pages/MemberCalendar";
import MemberFavorite from "./pages/MemberFavorite";
import MemberIdentify from "./pages/MemberIdentify";
import MemberIndex from "./pages/MemberIndex";
import MemberInfo from "./pages/MemberInfo";
import MemberRecord from "./pages/MemberRecord";
import Policy from "./pages/Policy";
import PostBuyTime from "./pages/PostBuyTime";
import PostSellTime from "./pages/PostSellTime";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import SellDemo from "./pages/SellDemo";
import SellGuide from "./pages/SellGuide";
import SellList from "./pages/SellList";
import ServiceRule from "./pages/ServiceRule";

function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/buydemo" element={<BuyDemo />}></Route>
          <Route path="/buyguide" element={<BuyGuide />}></Route>
          <Route path="/buylist" element={<BuyList />}></Route>
          <Route path="/forgetpassword" element={<ForgetPassword />}></Route>
          <Route path="/membercalendar" element={<MemberCalendar />}></Route>
          <Route path="/memberfavorite" element={<MemberFavorite />}></Route>
          <Route path="/memberidentify" element={<MemberIdentify />}></Route>
          <Route path="/memberindex" element={<MemberIndex />}></Route>
          <Route path="/memberinfo" element={<MemberInfo />}></Route>
          <Route path="/memberrecord" element={<MemberRecord />}></Route>
          <Route path="/policy" element={<Policy />}></Route>
          <Route path="/postbuytime" element={<PostBuyTime />}></Route>
          <Route path="/postselltime" element={<PostSellTime />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/resetpassword" element={<ResetPassword />}></Route>
          <Route path="/selldemo" element={<SellDemo />}></Route>
          <Route path="/sellguide" element={<SellGuide />}></Route>
          <Route path="/selllist" element={<SellList />}></Route>
          <Route path="/servicerule" element={<ServiceRule />}></Route>
        </Routes>        
      </div>
    </>
  );
}

export default App;