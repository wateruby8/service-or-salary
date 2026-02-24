import Header from "./components/Header";
import { Outlet, NavLink } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <div className="container">
        <Outlet />
      </div>
    </>
  );
}

export default App;