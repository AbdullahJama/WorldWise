import Styles from "./Sidebar.module.css";
import Logo from "./Logo.jsx";
import Footer from "./Footer.jsx";
import AppNav from "./AppNav.jsx";
import { Outlet } from "react-router-dom";
function Sidebar() {
  return (
    <div className={Styles.sidebar}>
      <Logo />
      <AppNav />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Sidebar;
