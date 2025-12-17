// src/pages/Employees/AllEmployee/AllEmployee.jsx
import React, { useEffect, useState } from "react";
import styles from "./AllEmployee.module.css";
import { FiUser, FiMail, FiPhone, FiMoreHorizontal, FiX } from "react-icons/fi";
import { getAllEmployees } from "../../../api/AllEmployeeData";
import Employeeavatar from "../../../assets/Employeeavatar.png"

export default function AllEmployees() {
  const [employees, setEmployees] = useState([]);
  const [selected, setSelected] = useState(null); // clicked employee


  useEffect(() => {
    async function load() {
      const data = await getAllEmployees();
      setEmployees(data);
    }
    load();
  }, []);

  console.log(employees);
  // TODO: Replace with your real API
  useEffect(() => {
    setEmployees(employees);
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.pageTitle}>All Employees </h2>
       
      {/* EMPLOYEE GRID */}
      <div className={styles.grid}>
        {employees.map(( emp, key) => (
          <div key={key} className={styles.card}>
            <div className={styles.left}>
              <img src={Employeeavatar} alt="avatar" className={styles.avatar} />
              <div>
                <h3 className={styles.name}>{emp.fullName}</h3>
                <p className={styles.role}>
                  {emp.roles?.join(", ").replaceAll("ROLE_", "")}
                </p>
              </div>
            </div>

            <div className={styles.info}>
              <div>
                <FiMail /> {emp.email}
              </div>
              <div>
                <FiPhone /> {emp.phoneNumber}
              </div>
            </div>

            <button
              className={styles.moreBtn}
              onClick={() => setSelected(emp)}
            >
              <FiMoreHorizontal />
            </button>
          </div>
        ))}
      </div>

      {/* MODAL POPUP FOR DETAILS */}
      {selected && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <button className={styles.closeBtn} onClick={() => setSelected(null)}>
              <FiX size={22} />
            </button>

            <div className={styles.modalHeader}>
              <img src={Employeeavatar} alt="avatar" className={styles.modalAvatar} />

              <div>
                <h2 className={styles.modalName}>{selected.fullName}</h2>
                <p className={styles.modalRole}>
                  {selected.roles?.join(", ").replaceAll("ROLE_", "")}
                </p>
              </div>
            </div>

            <div className={styles.modalContent}>
              <div className={styles.row}><span>Email:</span> {selected.email}</div>
              <div className={styles.row}><span>Phone:</span> {selected.phoneNumber}</div>
              <div className={styles.row}><span>Department:</span> {selected.department}</div>
              <div className={styles.row}><span>Emp Code:</span> {selected.empCode}</div>
              <div className={styles.row}><span>Gender:</span> {selected.gender}</div>
              <div className={styles.row}><span>Date of Birth:</span> {selected.dateOfBirth}</div>
              <div className={styles.row}><span>Hire Date:</span> {selected.hireDate}</div>
              <div className={styles.row}><span>Nationality:</span> {selected.nationality}</div>
              <div className={styles.row}><span>Address:</span> {selected.address}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
