import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      {/* 控制頁面變換時，能從頁首開始瀏覽 */}
      < ScrollToTop/> 
      <Header />
      <Outlet />
      <Footer />      
    </>
  );
}

export default App;