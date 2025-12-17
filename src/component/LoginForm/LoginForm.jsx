import styles from "./LoginForm.module.css";
import { useState, useCallback } from "react";
import { Lock, Mail, User, BadgeCheck } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import authFunction from "../../api/authApi";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../contextAPI/slices/authSlice";
import { setEmployeeProfile } from "../../contextAPI/slices/EmployeeDetailsSlice";
import { setCustomerProfile } from "../../contextAPI/slices/CustomerDetailsSlice";

const fields = [
  {
    label: "Email ID",
    name: "email",
    type: "email",
    placeholder: "you@example.com",
    icon: Mail,
    autoComplete: "email",
  },
  {
    label: "Password",
    name: "password",
    type: "password",
    placeholder: "•••••••••",
    icon: Lock,
    autoComplete: "password",
  },
];

export default function LoginForm() {
  const [activeRole, setActiveRole] = useState("user"); // "user" | "employee"
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = useCallback((e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      const data = await authFunction(formData);
      console.log(data);

      
      const roles = data.roles; // ["ROLE_ADMIN", "ROLE_CUSTOMER", etc.]

      // ROLE VALIDATION BASED ON ACTIVE TAB (IMPORTANT FIX)
      if (activeRole === "user") {
        if (!roles.includes("ROLE_CUSTOMER")) {
          alert("You are not authorized to login as Customer.");
          return;
        }
      }

      if (activeRole === "employee") {
        const employeeRoles = [
          "ROLE_ADMIN",
          "ROLE_MANAGER",
          "ROLE_COUNTER_EXECUTIVE",
        ];

        const isEmployee = roles.some((r) => employeeRoles.includes(r));

        if (!isEmployee) {
          alert("You are not authorized to login as Employee.");
          return;
        }
      }

      dispatch(
        loginSuccess(data)
      );

      dispatch(setEmployeeProfile(data));
      dispatch(setCustomerProfile(data));

      // REDIRECT BASED ON ROLES
      if (roles.includes("ROLE_CUSTOMER")) {
        navigate("/customer/dashboard");
      } else {
        navigate("/employee/dashboard");
      }

      setFormData({ email: "", password: "" });
    },
    [formData, activeRole]
  );

  return (
    <section className={styles.auth}>
      {/* ROLE SWITCH BUTTONS */}
      <div className={styles.roleTabs}>
        <button
          className={`${styles.roleTab} ${
            activeRole === "user" ? styles.activeTab : ""
          }`}
          onClick={() => setActiveRole("user")}
        >
          <User size={18} />
          User Login
        </button>

        <button
          className={`${styles.roleTab} ${
            activeRole === "employee" ? styles.activeTab : ""
          }`}
          onClick={() => setActiveRole("employee")}
        >
          <BadgeCheck size={18} />
          Employee Login
        </button>
      </div>

      <div
        className={`${styles.container} ${
          activeRole === "user" ? styles.userMode : styles.employeeMode
        }`}
      >
        {/* LEFT SIDE ICON */}
        <div className={styles.imageSide}>
          <div className={styles.bigIcon}>
            {activeRole === "user" ? (
              <User size={130} strokeWidth={1} />
            ) : (
              <BadgeCheck size={130} strokeWidth={1} />
            )}
          </div>
        </div>

        {/* RIGHT SIDE FORM */}
        <div className={styles.formSide}>
          <h2 className={styles.title}>
            {activeRole === "user" ? "User Login" : "Employee Login"}
          </h2>

          <form className={styles.form} onSubmit={handleSubmit}>
            {fields.map((field) => {
              const Icon = field.icon;
              return (
                <label key={field.name} className={styles.field}>
                  <span className={styles.fieldLabel}>{field.label}</span>
                  <div className={styles.inputWrapper}>
                    <Icon className={styles.inputIcon} />
                    <input
                      {...field}
                      value={formData[field.name]}
                      onChange={handleChange}
                      className={styles.input}
                      required
                    />
                  </div>
                </label>
              );
            })}

            <button type="submit" className={styles.submitButton}>
              Log In
            </button>
          </form>

          {activeRole === "user" && (
            <p className={styles.signupText}>
              Don’t have an account?
              <Link className={styles.signupLink} to="/signup">
                Create one
              </Link>
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
