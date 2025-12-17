import { useState } from "react";
// import EmployeeData from "../EmployeeDetails";
import useEmployeeDetails from "../useEmployeeDetails.jsx";
// import EmployeeData from "../../../contextAPI/slices/employeeSlice";

import styles from "./EmployeeSetting.module.css";
import {
  MdModeEdit,
  MdSave,
  MdCancel,
  MdVisibility,
  MdVisibilityOff,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setEmployeeProfile } from "../../../contextAPI/slices/EmployeeDetailsSlice.js";

export default function EmployeeSetting() {
  const EmployeeData = useEmployeeDetails();
  let dispatch = useDispatch();

  // Full employee object (initial)
  const initialEmployee = {
    name: EmployeeData.fullName || "",
    email: EmployeeData.email || "",
    password: EmployeeData.password || "",
    roles: EmployeeData.roles || [],
    aadharNumber: EmployeeData.aadharNumber || "",
    address: EmployeeData.address || "",
    dob: EmployeeData.dateOfBirth || "",
    department: EmployeeData.department || "",
    empCode: EmployeeData.empCode || "",
    gender: EmployeeData.gender || "",
    hireDate: EmployeeData.hireDate || "",
    managerEmpCode: EmployeeData.managerEmpCode || "No Manager (Admin Account)",
    nationality: EmployeeData.nationality || "",
    phone: EmployeeData.phoneNumber || "",
    avatar: EmployeeData.avatardefault || "/avatar.png",
  };

  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState(initialEmployee);

  // show/hide plain password (during edit)
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  async function updateEmployee(updatedData) {
    const auth = JSON.parse(localStorage.getItem("auth"));
    const token = auth?.token;

    const res = await fetch(`http://localhost:8080/api/allemployees/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedData),
    });

    if (!res.ok) throw new Error("Failed to update employee");
    return res.json();
  }

  const handleSave = async () => {
    try {
      const updated = await updateEmployee({
        fullName: form.name,
        dateOfBirth: form.dob,
        gender: form.gender,
        nationality: form.nationality,
        address: form.address,
        phoneNumber: form.phone,
        department: form.department,
        alternateEmail: EmployeeData.email,
      });

      console.log("Updated:", updated);

      // now update Redux store here
      dispatch(setEmployeeProfile(updated));

      setEditMode(false);
    } catch (err) {
      console.error(err);
      alert("Failed to update");
    }
  };

  const handleCancel = () => {
    setForm(initialEmployee);
    setEditMode(false);
    setShowPassword(false);
  };

  return (
    <div className={styles.container}>
      {/* TOP PROFILE CARD */}
      <div className={styles.profileHeader}>
        <img src={form.avatar} alt="avatar" className={styles.avatar} />

        <div className={styles.profileMain}>
          <h2 className={styles.name}>
            {form.name}
            <span className={styles.verified}>✔</span>
          </h2>
          <p className={styles.email}>{form.email}</p>
        </div>

        {/* EDIT / SAVE / CANCEL */}
        <div className={styles.topRight}>
          {!editMode ? (
            <button
              className={styles.editBtn}
              onClick={() => setEditMode(true)}
            >
              <MdModeEdit /> <span className={styles.btnText}>Edit</span>
            </button>
          ) : (
            <div className={styles.editActions}>
              <button className={styles.saveBtn} onClick={handleSave}>
                <MdSave /> <span className={styles.btnText}>Save</span>
              </button>
              <button className={styles.cancelBtn} onClick={handleCancel}>
                <MdCancel /> <span className={styles.btnText}>Cancel</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* DETAILS CARD */}
      <div className={styles.card}>
        <h3 className={styles.cardTitle}>Personal Details</h3>

        {/* Reusable row: label + value */}
        <div className={styles.row}>
          <div className={styles.label}>Full Name</div>
          <div className={styles.value}>
            {editMode ? (
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className={styles.input}
              />
            ) : (
              <div className={styles.textValue}>{form.name}</div>
            )}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Date of Birth</div>
          <div className={styles.value}>
            {editMode ? (
              <input
                type="date"
                name="dob"
                value={form.dob}
                onChange={handleChange}
                className={styles.input}
              />
            ) : (
              <div className={styles.textValue}>{form.dob}</div>
            )}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Gender</div>
          <div className={styles.value}>
            {editMode ? (
              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                className={styles.input}
              >
                <option value="">Select</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            ) : (
              <div className={styles.textValue}>{form.gender}</div>
            )}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Nationality</div>
          <div className={styles.value}>
            {editMode ? (
              <input
                name="nationality"
                value={form.nationality}
                onChange={handleChange}
                className={styles.input}
              />
            ) : (
              <div className={styles.textValue}>{form.nationality}</div>
            )}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Address</div>
          <div className={styles.value}>
            {editMode ? (
              <textarea
                name="address"
                value={form.address}
                onChange={handleChange}
                className={styles.textarea}
              />
            ) : (
              <div className={styles.textValue}>{form.address}</div>
            )}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Phone</div>
          <div className={styles.value}>
            {editMode ? (
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className={styles.input}
              />
            ) : (
              <div className={styles.textValue}>{form.phone}</div>
            )}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Aadhar</div>
          <div className={styles.value}>
            <div className={styles.textValue}>{form.aadharNumber}</div>
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Department</div>
          <div className={styles.value}>
            <div className={styles.textValue}>{form.department}</div>
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Emp Code</div>
          <div className={styles.value}>
            <div className={styles.textValue}>{form.empCode}</div>
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Hire Date</div>
          <div className={styles.value}>
            <div className={styles.textValue}>{form.hireDate}</div>
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Manager Code</div>
          <div className={styles.value}>
            <div className={styles.textValue}>{form.managerEmpCode}</div>
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Role(s)</div>
          <div className={styles.value}>
            <div className={styles.textValue}>
              {form.roles?.map((r) => r.replace("ROLE_", "")).join(", ")}
            </div>
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Email</div>
          <div className={styles.value}>
            <div className={styles.textValue}>{form.email}</div>
          </div>
        </div>

        {/* PASSWORD ROW with mask and toggle */}
        <div className={styles.row}>
          <div className={styles.label}>Password</div>

          <div className={styles.value}>
            <div className={styles.textValue}>•••••••••••</div>
            {/* {!editMode ? (
              // non-edit mode: always show masked dots
              <div className={styles.textValue}>•••••••••••</div>
            ) : (
              // edit mode: show input and eye toggle
              <div className={styles.passwordRow}>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  className={styles.input}
                />
                <button
                  type="button"
                  className={styles.eyeBtn}
                  onClick={() => setShowPassword((s) => !s)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                </button>
              </div>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
}
