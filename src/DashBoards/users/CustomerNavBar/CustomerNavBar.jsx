import { Link, NavLink } from "react-router-dom";
import styles from "./CustomerNavBar.module.css";
import { FiHome, FiUser, FiLogOut } from "react-icons/fi";

import { useDispatch } from "react-redux";
import { logout } from "../../../contextAPI/slices/authSlice";

import avatardefault from "../../../assets/avatardefault.png";
// import logo from "../../../../public/logo.svg";
import logo from "/logo.svg?url";

import { FaAddressCard } from "react-icons/fa6";
import { RiFolderHistoryFill } from "react-icons/ri";

import { FcSimCardChip } from "react-icons/fc";

export default function CustomerNavBar() {
  const dispatch = useDispatch();

  return (
    <header className={styles.navbar}>
      {/* LEFT */}
      <div className={styles.left}>
        <img src={logo} alt="Metro" className={styles.logo} />
        <span className={styles.brand}>Metro</span>
      </div>

      {/* CENTER LINKS */}
      <nav className={styles.menu}>
        <NavLink
          to="/customer/dashboard"
          end
          className={({ isActive }) =>
            `${styles.link} ${isActive ? styles.active : ""}`
          }
        >
          <FiHome /> Dashboard
        </NavLink>

        <NavLink
          to="/customer/dashboard/cardhistory"
          className={({ isActive }) =>
            `${styles.link} ${isActive ? styles.active : ""}`
          }
        >
          <RiFolderHistoryFill /> Card History
        </NavLink>

        <NavLink
          to="/customer/dashboard/cardrecharge"
          className={({ isActive }) =>
            `${styles.link} ${isActive ? styles.active : ""}`
          }
        >
          <FaAddressCard /> Card Recharge
        </NavLink>

        <NavLink
          to="/customer/dashboard/profile"
          className={({ isActive }) =>
            `${styles.link} ${isActive ? styles.active : ""}`
          }
        >
          <FiUser /> Profile
        </NavLink>


        <NavLink
          to="/customer/dashboard/demo"
          className={({ isActive }) =>
            `${styles.link} ${isActive ? styles.active : ""}`
          }
        >
          <FcSimCardChip /> demo
        </NavLink>
      </nav>

      {/* RIGHT */}
      <div className={styles.right}>
        <Link to="/customer/dashboard/profile">
          <div className={styles.avatar}>
            <img alt="avatar" src={avatardefault} />
          </div>
        </Link>

        

        <button
          className={styles.logout}
          onClick={() => {
            dispatch(logout());
          }}
        >
          <FiLogOut /> Logout
        </button>
      </div>
    </header>
  );
}
