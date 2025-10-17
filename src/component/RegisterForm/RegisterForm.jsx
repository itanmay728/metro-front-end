import React, { useState, useCallback } from "react";
import styles from "./RegisterForm.module.css";
import { useDispatch } from "react-redux";
import { showLoginForm } from "../../contextAPI/authUISlice";
import {
  Fingerprint,
  Home,
  Lock,
  Mail,
  Phone,
  UserRound,
} from "lucide-react";

const createAccountFields = [
  {
    label: "Full Name",
    name: "fullName",
    type: "text",
    placeholder: "John Doe",
    icon: UserRound,
    autoComplete: "name",
  },
  {
    label: "Email ID",
    name: "email",
    type: "email",
    placeholder: "you@example.com",
    icon: Mail,
    autoComplete: "email",
  },
  {
    label: "Mobile Number",
    name: "phone",
    type: "tel",
    placeholder: "+91 1234567890",
    icon: Phone,
    autoComplete: "tel",
    inputMode: "tel",
    pattern: "[0-9+ ]{10,15}",
  },
  {
    label: "Address",
    name: "address",
    type: "text",
    placeholder: "123 Metro Lane, City",
    icon: Home,
    autoComplete: "street-address",
  },
  {
    label: "Aadhar Number",
    name: "aadhar",
    type: "text",
    placeholder: "XXXX XXXX XXXX",
    icon: Fingerprint,
    inputMode: "numeric",
    pattern: "[0-9 ]{12,14}",
    maxLength: 14,
  },
  {
    label: "Password",
    name: "password",
    type: "password",
    placeholder: "••••••••",
    icon: Lock,
    autoComplete: "new-password",
  },
];

function RegisterForm() {
  const dispatch = useDispatch();

  // State for controlled form
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    aadhar: "",
    password: "",
  });

  // Generic input change handler
  const handleChange = useCallback((event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  // Handle form submission
  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      console.log("Form submitted:", formData);
      // You can dispatch a registration action here instead of console.log
    },
    [formData]
  );

  return (
    <section className={styles.auth}>
      <div className={styles.authCard} aria-labelledby="create-account-heading">
        <header className={styles.authHeader}>
          <h2 id="create-account-heading" className={styles.authTitle}>
            Create Account
          </h2>
          <p className={styles.authSubtitle}>Let&apos;s get you started!</p>
        </header>

        <form className={styles.form} onSubmit={handleSubmit}>
          {createAccountFields.map((field) => {
            const Icon = field.icon;
            return (
              <label key={field.name} className={styles.field} htmlFor={field.name}>
                <span className={styles.fieldLabel}>{field.label}</span>
                <div className={styles.inputWrapper}>
                  <Icon className={styles.inputIcon} aria-hidden />
                  <input
                    id={field.name}
                    name={field.name}
                    type={field.type}
                    placeholder={field.placeholder}
                    autoComplete={field.autoComplete}
                    inputMode={field.inputMode}
                    pattern={field.pattern}
                    maxLength={field.maxLength}
                    required
                    className={styles.input}
                    value={formData[field.name] || ""}
                    onChange={handleChange}
                  />
                </div>
              </label>
            );
          })}

          <button type="submit" className={styles.submitButton}>
            Create Account
          </button>
        </form>

        <p className={styles.loginPrompt}>
          Already have an account?{" "}
          <button
            type="button"
            className={styles.loginLink}
            onClick={() => dispatch(showLoginForm())}
          >
            Log In
          </button>
        </p>
      </div>
    </section>
  );
}

export default RegisterForm;
