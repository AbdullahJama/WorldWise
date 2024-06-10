//import AppNav from "../Components/AppNav";
import Sidebar from "../Components/Sidebar";
import Map from "../Components/Map";
import styles from "./AppLayout.module.css";
import User from "../Components/User";
import { useAuth } from "../contexts/FakeAuthContext";

function Applayout() {
  const { isAuthenticated } = useAuth();

  return (
    <div className={styles.app}>
      <User />
      <Sidebar />
      <Map />
    </div>
  );
}

export default Applayout;
