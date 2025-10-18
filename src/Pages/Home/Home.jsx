import React from "react";
import styles from "./Home.module.css";
import RegisterForm from "../../component/RegisterForm/RegisterForm";
import LoginForm from "../../component/LoginForm/LoginForm";
import { useSelector } from "react-redux";
import map from "../../assets/mapMetro.png"
// import { AnimatePresence, motion } from "framer-motion";

import { Fingerprint, Home, Lock, Mail, Phone, UserRound,TramFront } from "lucide-react";





function home() {
  const currentForm = useSelector((state) => state.authUI.currentForm);

  return (

    
    <div className={styles.page}>
      <div className={styles.layout}>

        {/* left side */}
        <section className={styles.hero}>
          <div className={styles.heroOverlay} aria-hidden />
          <header className={styles.logoRow}>
            <span className={styles.logoMark} aria-hidden>
              <TramFront className={styles.logo}/>
            </span>
            <span className={styles.logoText}>MetroApp</span>
          </header>
          <div className={styles.map}>
            <img src={map} alt="" />
          </div>
          <div className={styles.heroBody}>
            <h1 className={styles.heroTitle}>Your city, your metro.</h1>
            <p className={styles.heroSubtitle}>
              All your metro needs in one place. Simple, fast, and always on time.
            </p>
          </div>
        </section>

        {/* right side */}

        { currentForm === "login" ? <LoginForm/> : <RegisterForm/>}
  
      </div>
    </div>
  );
}

export default home;
