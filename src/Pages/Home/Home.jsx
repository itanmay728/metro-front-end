import React from "react";
import styles from "./Home.module.css";
import RegisterForm from "../../component/RegisterForm/RegisterForm";
import LoginForm from "../../component/LoginForm/LoginForm";
import { useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";

function Home() {
  const currentForm = useSelector((state) => state.authUI.currentForm);

  return (
    <div className={styles.homeContainer}>
      <div className={styles.overlay}>
        <div className={styles.homeContent}>
          {/* Left Side */}
          <div className={styles.homeLeft}>
            <h1 className={styles.homeTitle}>Welcome to MetroApp</h1>
            <p className={styles.homeSubtitle}>
              Manage your metro card, check balance & travel history seamlessly.
            </p>
          </div>

          {/* Right Side - Animated Form */}
          <div className={styles.homeRight}>
            <AnimatePresence mode="wait">
              {currentForm === "login" ? (
                <motion.div
                  key="login"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                  <LoginForm />
                </motion.div>
              ) : (
                <motion.div
                  key="register"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                  <RegisterForm />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
