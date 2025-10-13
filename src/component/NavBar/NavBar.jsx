import React from "react";
import styles from "./Navbar.module.css";
import logo from "../../assets/logo.svg";
import { useDispatch } from "react-redux";
import { showLoginForm } from "../../contextAPI/authUISlice";

function Navbar() {
  const dispatch = useDispatch();

  return (
    <nav className={styles.navbar}>
      <div className={styles.navLogo}>
        <img src={logo} alt="Metro Logo" className={styles.navLogoImg} />
        <span className={styles.navLogoText}>MetroApp</span>
      </div>
      <button
        className={styles.loginBtn}
        onClick={() => dispatch(showLoginForm())}
      >
        Login
      </button>
    </nav>
  );
}

export default Navbar;
