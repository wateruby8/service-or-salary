import Home from "../pages/Home";
import Login from "../pages/Login";
import About from "../pages/About";
import BuyDemo from "../pages/BuyDemo";
import BuyGuide from "../pages/BuyGuide";
import BuyList from "../pages/BuyList";
import ForgetPassword from "../pages/ForgetPassword";

import MemberLayout from "../pages/MemberLayout";
import MemberCalendar from "../pages/MemberCalendar";
import MemberFavorite from "../pages/MemberFavorite";
import MemberIdentify from "../pages/MemberIdentify";
import MemberIndex from "../pages/MemberIndex";
import MemberInfo from "../pages/MemberInfo";
import MemberRecord from "../pages/MemberRecord";

import Policy from "../pages/Policy";
import PostBuyTime from "../pages/PostBuyTime";
import PostSellTime from "../pages/PostSellTime";
import Register from "../pages/Register";
import ResetPassword from "../pages/ResetPassword";
import SellDemo from "../pages/SellDemo";
import SellGuide from "../pages/SellGuide";
import SellList from "../pages/SellList";
import ServiceRule from "../pages/ServiceRule";

const routes = [
  {
    index: true,
    element: <Home />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "about",
    element: <About />,
  },
  {
    path: "buydemo",
    element: <BuyDemo />,
  },
  {
    path: "buyguide",
    element: <BuyGuide />,
  },
  {
    path: "buylist",
    element: <BuyList />,
  },
  {
    path: "forgetpassword",
    element: <ForgetPassword />,
  },
  {
    path: "member",
    element: <MemberLayout />,
    children: [
      {
        index:true,
        element:<MemberIndex/>
      },
      {
        path: "identify",
        element: <MemberIdentify />,
      },
      {
        path: "info",
        element: <MemberInfo />,
      },
      {
        path: "record",
        element: <MemberRecord />,
      },
      {
        path: "calendar",
        element: <MemberCalendar />,
      },
      {
        path: "favorite",
        element: <MemberFavorite />,
      }
    ],
  },
  {
    path: "policy",
    element: <Policy />,
  },
  {
    path: "postbuytime",
    element: <PostBuyTime />,
  },
  {
    path: "postselltime",
    element: <PostSellTime />,
  },
  {
    path: "register",
    element: <Register />,
  },
  {
    path: "resetpassword",
    element: <ResetPassword />,
  },
  {
    path: "selldemo",
    element: <SellDemo />,
  },
  {
    path: "sellguide",
    element: <SellGuide />,
  },
  {
    path: "selllist",
    element: <SellList />,
  },
  {
    path: "servicerule",
    element: <ServiceRule />,
  },
];

export default routes;
