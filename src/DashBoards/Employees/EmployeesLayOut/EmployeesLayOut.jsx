// src/layout/EmployeesLayout.jsx
import React, { useState, useEffect } from "react";
import EmployeesNavBar from "../EmployeesNavBar/EmployeesNavBar";
import styles from "./EmployeesLayOut.module.css";
import { Outlet } from "react-router-dom";
import EmployeeHeader from "../EmployeeHeader/EmployeeHeader";

export default function EmployeesLayOut() {
  const [darkMode, setDarkMode] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  // optional: load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("darkMode");
    if (saved) setDarkMode(saved === "true");
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
    document.documentElement.setAttribute(
      "data-theme",
      darkMode ? "dark" : "light"
    );
  }, [darkMode]);

  return (
    <div className={`${styles.app} ${darkMode ? styles.dark : ""}`}>
      <EmployeesNavBar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        onToggleDark={() => setDarkMode((v) => !v)}
        darkMode={darkMode}
      />
      
      <main className={styles.content}>
        <EmployeeHeader/>
        <Outlet />
      </main>
    </div>
  );
}
