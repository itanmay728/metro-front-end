// import React from "react";
import styles from "./LoginForm.module.css";
import { showRegisterForm } from "../../contextAPI/authUISlice";
import { useDispatch } from "react-redux";
import React, { useState, useCallback } from "react";
import { Lock, Mail,} from "lucide-react";



const createAccountFields = [
  {
    label: "Email ID",
    name: "email_id",
    type: "email",
    placeholder: "you@example.com",
    icon: Mail,
    autoComplete: "email",
  },
   {
    label: "Password",
    name: "password",
    type: "password",
    placeholder: "••••••••",
    icon: Lock,
    autoComplete: "password",
  },
];


function LoginForm() {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
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
    async (event) => {
      event.preventDefault();
      console.log("Form submitted:", formData);
      // You can dispatch a registration action here instead of console.log
      setFormData({
        email_id: "",
        password: "",
      });
    },
    [formData]
  );

    

  return (
   <section className={styles.auth}>
         <div className={styles.authCard} aria-labelledby="create-account-heading">
           <header className={styles.authHeader}>
             <h2 id="create-account-heading" className={styles.authTitle}>
               LOG IN
             </h2>
             <p className={styles.authSubtitle}>Let&apos;s get you started!</p>
           </header>
   
           <form className={styles.form} onSubmit={handleSubmit}>
             {createAccountFields.map((field) => {
               const Icon = field.icon;
               return (
                 <label
                   key={field.name}
                   className={styles.field}
                   htmlFor={field.name}
                 >
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
               LOG IN
             </button>
           </form>
   
           <p className={styles.loginPrompt}>
             Don't have an account?{" "}
             <button
               type="button"
               className={styles.loginLink}
               onClick={() => dispatch(showRegisterForm())}
             >
               Create an Account
             </button>
           </p>
         </div>
       </section>
  );
}

export default LoginForm;
