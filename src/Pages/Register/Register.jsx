import React from 'react'

import styles from "./Register.module.css";
import RegisterForm from "../../component/RegisterForm/RegisterForm";
import map from "../../assets/mapMetro.png"

const Register = () => {
  return (
    <div className={styles.page}>
      <div className={styles.layout}>

        {/* left side */}
        <section className={styles.hero}>
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

         <RegisterForm/>
  
      </div>
    </div>
  )
}

export default Register