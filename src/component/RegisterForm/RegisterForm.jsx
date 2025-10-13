import React from "react";
import styles from "./RegisterForm.module.css";
import { useDispatch } from "react-redux";
import { showLoginForm } from "../../contextAPI/authUISlice";

function RegisterForm() {
  const dispatch = useDispatch();

  return (
    <div className={styles.registerCard}>
      <h2 className={styles.heading}>Create Your Metro Account</h2>
      <form>
        <div className={styles.formGroup}>
          <label className={styles.label}>Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            className={styles.input}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className={styles.input}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            className={styles.input}
            required
          />
        </div>

        <button type="submit" className={styles.registerBtn}>
          Sign Up
        </button>
      </form>

      <p className={styles.loginText}>
        Already have an account?{" "}
        <span
          className={styles.loginLink}
          onClick={() => dispatch(showLoginForm())}
        >
          Login
        </span>
      </p>
    </div>
  );
}

export default RegisterForm;
