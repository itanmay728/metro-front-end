import React, { useState, useCallback } from "react";
import styles from "./RegisterForm.module.css";
import { Fingerprint, Home, Lock, Mail, Phone, UserRound } from "lucide-react";
import axios from "axios";
import { Link } from "react-router-dom";

const fields = [
  {
    label: "Full Name",
    name: "fullName",
    type: "text",
    placeholder: "John Doe",
    icon: UserRound,
    autoComplete: "name",
  },
  {
    label: "Email",
    name: "emailId",
    type: "email",
    placeholder: "example@mail.com",
    icon: Mail,
    autoComplete: "email",
  },
  {
    label: "Phone Number",
    name: "phoneNumber",
    type: "tel",
    placeholder: "+91 9876543210",
    icon: Phone,
    autoComplete: "tel",
    inputMode: "tel",
  },
  {
    label: "Address",
    name: "address",
    type: "text",
    placeholder: "Delhi, India",
    icon: Home,
  },
  {
    label: "Aadhar Number",
    name: "aadharNumber",
    type: "text",
    placeholder: "XXXX XXXX XXXX",
    icon: Fingerprint,
    inputMode: "numeric",
    maxLength: 12,
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

export default function RegisterForm() {

  const [formData, setFormData] = useState({
    fullName: "",
    emailId: "",
    phoneNumber: "",
    address: "",
    aadharNumber: "",
    password: "",
  });

  // Input handler
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  // Submit handler
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      console.log("Submitting:", formData);

      try {
        const response = await axios.post(
          "http://localhost:8080/api/public/auth/addcustomer",
          formData,
          { headers: { "Content-Type": "application/json" } }
        );

        console.log("SUCCESS:", response.data);
        alert("Account created successfully!");

        
      } catch (error) {
        console.error("REGISTRATION ERROR:", error);
        alert("Failed to register. Check details and try again.");
      }

      // Reset form
      setFormData({
        fullName: "",
        emailId: "",
        phoneNumber: "",
        address: "",
        aadharNumber: "",
        password: "",
      });
    },
    [formData]
  );

  return (
    <section className={styles.auth}>
      <div className={styles.authCard}>
        <header className={styles.authHeader}>
          <h2 className={styles.authTitle}>Create Account</h2>
          <p className={styles.authSubtitle}>Let’s get you started!</p>
        </header>

        <form className={styles.form} onSubmit={handleSubmit}>
          {fields.map((f) => {
            const Icon = f.icon;
            return (
              <label key={f.name} className={styles.field}>
                <span className={styles.fieldLabel}>{f.label}</span>

                <div className={styles.inputWrapper}>
                  <Icon className={styles.inputIcon} />
                  <input
                    name={f.name}
                    type={f.type}
                    placeholder={f.placeholder}
                    autoComplete={f.autoComplete}
                    inputMode={f.inputMode}
                    maxLength={f.maxLength}
                    required
                    className={styles.input}
                    value={formData[f.name]}
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
          <Link className={styles.loginLink} to="/signin">
            Log In
          </Link>
        </p>
      </div>
    </section>
  );
}
