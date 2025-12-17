import { useState } from "react";
import styles from "./AddNewEmployee.module.css";

export default function AddNewEmployee() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    gender: "",
    department: "",
    aadharNumber: "",
    dateOfBirth: "",
    nationality: "",
    address: "",
    password: "",
    roles: "ROLE_COUNTER_EXECUTIVE",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const auth = JSON.parse(localStorage.getItem("auth"));
      const token = auth?.token;

      const res = await fetch("http://localhost:8080/api/manager/addemployee", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed to add employee");

      const text = await res.text();
      alert("Employee added successfully:");
    //   alert("Employee added successfully");
      setForm({
        fullName: "",
        email: "",
        phoneNumber: "",
        gender: "",
        department: "",
        aadharNumber: "",
        dateOfBirth: "",
        nationality: "",
        address: "",
        password: "",
        roles: "ROLE_COUNTER_EXECUTIVE",
      });
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Add New Employee</h2>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.grid}>
          <div className={styles.field}>
            <input
              name="fullName"
              placeholder="Full Name"
              value={form.fullName}
              onChange={handleChange}
            />
          </div>

          <div className={styles.field}>
            <input
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div className={styles.field}>
            <input
              name="phoneNumber"
              placeholder="Phone Number"
              value={form.phoneNumber}
              onChange={handleChange}
            />
          </div>

          <div className={styles.field}>
            <input
              type="date"
              name="dateOfBirth"
              value={form.dateOfBirth}
              onChange={handleChange}
            />
          </div>

          <div className={styles.field}>
            <select name="gender" value={form.gender} onChange={handleChange}>
              <option value="">Select Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>

          <div className={styles.field}>
            <input
              name="department"
              placeholder="Department"
              value={form.department}
              onChange={handleChange}
            />
          </div>

          <div className={styles.field}>
            <input
              name="aadharNumber"
              placeholder="Aadhar number"
              value={form.aadharNumber}
              onChange={handleChange}
            />
          </div>

          <div className={styles.field}>
            <input
              name="nationality"
              placeholder="Nationality"
              value={form.nationality}
              onChange={handleChange}
            />
          </div>

          <div className={styles.field}>
            <input
              name="password"
              placeholder="password"
              value={form.password}
              onChange={handleChange}
            />
          </div>

          <div className={`${styles.field} `}>
            <select name="roles" value={form.roles} onChange={handleChange}>
              <option value="ROLE_ADMIN">Admin</option>
              <option value="ROLE_MANAGER">Manager</option>
              <option value="ROLE_COUNTER_EXECUTIVE">Counter Executive</option>
            </select>
          </div>

          <div className={`${styles.field} ${styles.full}`}>
            <textarea
              name="address"
              placeholder="Address"
              value={form.address}
              onChange={handleChange}
            />
          </div>
        </div>

        <button type="submit" className={styles.submitBtn}>
          Add Employee
        </button>
      </form>
    </div>
  );
}
