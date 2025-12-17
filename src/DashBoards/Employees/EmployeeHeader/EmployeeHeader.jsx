import { useEffect, useState } from "react";
import styles from "./EmployeeHeader.module.css";
import { FiBell, FiMessageCircle } from "react-icons/fi";
import { Link } from "react-router-dom";
import useEmployeeDetails from "../useEmployeeDetails.jsx";

export default function EmployeeHeader() {
   const [dateTime, setDateTime] = useState(new Date());
   const EmployeeData = useEmployeeDetails();

  // 🔁 Auto update time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(interval); // cleanup
  }, []);
  return (
    <header className={styles.header}>
      <div className={styles.brandLeft}>
        <h2>Good Morning</h2>
        <h1>{EmployeeData.fullName}</h1>
      </div>

      <div className={styles.center}>
        <span>{EmployeeData.email}</span>
        <span>{dateTime.toLocaleString()}</span>
      </div>



      <div className={styles.headerRight}>
        <button className={styles.iconBtn}>
          <FiMessageCircle />
        </button>
        <button className={styles.iconBtn}>
          <FiBell />
        </button>
        <Link to="/employee/dashboard/settings">
        <div className={styles.avatar}>
          <img alt="avatar" src={EmployeeData.avatardefault} />
        </div>
        </Link>
      </div>
    </header>
  );
}
