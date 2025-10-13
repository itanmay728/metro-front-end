import React from "react";
import styles from "./LoginForm.module.css";
import { showRegisterForm } from "../../contextAPI/authUISlice";
import { useDispatch } from "react-redux";

function LoginForm() {
  const dispatch = useDispatch();

  return (
    <form className={styles.loginForm}>
      <h2 className={styles.heading}>Login</h2>

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
          placeholder="Enter your password"
          className={styles.input}
          required
        />
      </div>

      <button type="submit" className={styles.loginBtn}>
        Login
      </button>

      <div className={styles.loginFooter}>
        <p>
          Don’t have an account?{" "}
          <span
            className={styles.link}
            onClick={() => dispatch(showRegisterForm())}
          >
            Register
          </span>
        </p>
        <p className={styles.or}>OR</p>
        <button type="button" className={styles.googleBtn}>
          Login with Google
        </button>
      </div>
    </form>
  );
}

export default LoginForm;
