// import React from "react";
// import styles from "./Navbar.module.css";
// import logo from "../../assets/logo.svg";
// import { useDispatch } from "react-redux";
// import { showLoginForm } from "../../contextAPI/authUISlice";

// function Navbar() {
//   const dispatch = useDispatch();

//   return (
//     <nav className={styles.navbar}>
//       <div className={styles.navLogo}>
//         <img src={logo} alt="Metro Logo" className={styles.navLogoImg} />
//         <span className={styles.navLogoText}>MetroApp</span>
//       </div>
//       <button
//         className={styles.loginBtn}
//         onClick={() => dispatch(showLoginForm())}
//       >
//         Login
//       </button>
//     </nav>
//   );
// }

// export default Navbar;


import React, { useState } from "react";
import styles from "./Navbar.module.css";
import logo from "../../assets/logo.svg";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className={styles.navbar}>
      {/* Left Section */}
      <Link to="/" className={styles.leftLink}>
      <div className={styles.left}>
        <div className={styles.logo}>
          <img src={logo} alt="Metro Logo" />
        </div>
        <h2 className={styles.title}>Metro</h2>
      </div>
      </Link>

      {/* Desktop Navigation */}
      <nav className={`${styles.navLinks} ${isOpen ? styles.open : ""}`}>
        <Link to="/">Home</Link>
        <Link to="">Network</Link>
        <Link to="/about">About</Link>
        <Link to="/signin">Sign in</Link>
        <Link to="/signup">Sign Up</Link>
      </nav>

      {/* Hamburger Button (Mobile) */}
      <button className={styles.menuBtn} onClick={toggleMenu}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && <div className={styles.overlay} onClick={toggleMenu}></div>}
    </header>
  );
};

export default Navbar;

