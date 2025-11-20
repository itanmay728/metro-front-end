import React from "react";
import styles from "./LayOut.module.css";
import { Outlet } from "react-router-dom";
import NavBar from "./component/NavBar/NavBar"
import Footer from "./component/Footer/Footer"

function App() {
  return (
    <div className={styles.app}>
      <NavBar/>
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer/>
    </div>
  );
}

export default App;
