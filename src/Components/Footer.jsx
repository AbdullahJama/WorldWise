import Styles from "./Sidebar.module.css";

function Footer() {
  return (
    <footer className={Styles.footer}>
      <p className={Styles.copyrights}>
        &copy; copyrights {new Date().getFullYear} by WorldWise Inc.
      </p>
    </footer>
  );
}

export default Footer;
