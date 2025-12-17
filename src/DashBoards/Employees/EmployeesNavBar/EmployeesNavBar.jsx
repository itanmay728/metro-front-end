import React from "react";
import styles from "./EmployeesNavBar.module.css";
import { FiHome, FiUsers, FiSettings, FiLogOut } from "react-icons/fi";

import {
  TbLayoutSidebarLeftCollapse,
  TbLayoutSidebarRightCollapse,
} from "react-icons/tb";

import { MdWorkOutline } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";

import { NavLink } from "react-router-dom";
import logo from "../../../assets/logo.svg";

import { useDispatch } from "react-redux";
import { logout } from "../../../contextAPI/slices/authSlice";
import { clearEmployeeProfile } from "../../../contextAPI/slices/EmployeeDetailsSlice";
import useEmployeeDetails from "../useEmployeeDetails.jsx";

export default function EmployeesNavBar({
  collapsed,
  setCollapsed,
  onToggleDark,
  darkMode,
}) {
  let dispatch = useDispatch();
  const employeeData = useEmployeeDetails();
  const isAdmin = employeeData?.roles?.includes("ROLE_ADMIN");

  const isManagerAndAdmin = employeeData?.roles?.includes(
    "ROLE_ADMIN",
    "ROLE_MANAGER"
  );

  return (
    <aside className={`${styles.sidebar} ${collapsed ? styles.collapsed : ""}`}>
      {/* -------- LOGO + TOGGLE BUTTON -------- */}
      <div className={styles.brand}>
        <div className={styles.logo}>
          <img src={logo} alt="Metro" />
        </div>

        {!collapsed && (
          <div className={styles.title}>
            <div className={styles.name}>Metro</div>
            <div className={styles.sub}>
              {employeeData.roles
                ?.map((role) => role.replace("ROLE_", ""))
                .join(", ")}
            </div>
          </div>
        )}

        {/* Collapse Icon */}
        <button
          className={styles.collapseBtn}
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? (
            <TbLayoutSidebarRightCollapse size={22} />
          ) : (
            <TbLayoutSidebarLeftCollapse size={22} />
          )}
        </button>
      </div>

      {/* ---------------- MENU ---------------- */}
      <nav className={styles.menu}>
        <NavLink
          to="/employee/dashboard"
          end
          className={({ isActive }) =>
            `${styles.menuItem} ${isActive ? styles.active : ""}`
          }
        >
          <FiHome className={styles.icon} />
          {!collapsed && <span>Dashboard</span>}
        </NavLink>

        {isAdmin && (
          <NavLink
            to="/employee/dashboard/allemployees"
            className={({ isActive }) =>
              `${styles.menuItem} ${isActive ? styles.active : ""}`
            }
          >
            <MdWorkOutline className={styles.icon} />
            {!collapsed && <span>All Employees</span>}
          </NavLink>
        )}

        {isAdmin && (
          <NavLink
            to="/employee/dashboard/allcustomers"
            className={({ isActive }) =>
              `${styles.menuItem} ${isActive ? styles.active : ""}`
            }
          >
            <FiUsers className={styles.icon} />
            {!collapsed && <span>All Customers</span>}
          </NavLink>
        )}

        {isManagerAndAdmin && (
          <NavLink
            to="/employee/dashboard/addnewemployee"
            className={({ isActive }) =>
              `${styles.menuItem} ${isActive ? styles.active : ""}`
            }
          >
            <FaRegUser className={styles.icon} />
            {!collapsed && <span>Add Employee</span>}
          </NavLink>
        )}

        <NavLink
          to="/employee/dashboard/settings"
          className={({ isActive }) =>
            `${styles.menuItem} ${isActive ? styles.active : ""}`
          }
        >
          <FiSettings className={styles.icon} />
          {!collapsed && <span>Settings</span>}
        </NavLink>
      </nav>

      {/* --------------- BOTTOM SECTION --------------- */}
      <div className={styles.bottom}>
        <button className={styles.menuItem} onClick={onToggleDark}>
          <FiSettings className={styles.icon} />
          {!collapsed && <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>}
        </button>

        <NavLink
          to="/logout"
          onClick={() => {
            dispatch(logout()), dispatch(clearEmployeeProfile());
          }}
          className={styles.menuItem}
        >
          <FiLogOut className={styles.icon} />
          {!collapsed && <span>Logout</span>}
        </NavLink>
      </div>
    </aside>
  );
}
