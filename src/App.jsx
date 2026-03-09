import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import { Outlet, NavLink ,useLocation } from "react-router-dom";

function App() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  return (
    <>
      <Header />
      {isHomePage ? (
              /* 首頁：不包 container，讓 Home 內部的 Section 自己控制滿版 */
              <main>
                <Home />
                {/* <Outlet /> */}
              </main>
            ) : (
              /* 其他頁面：保留 container */
              <div className="container">
                <Outlet />
              </div>
            )}
      <Footer />      
    </>
  );
}

export default App;