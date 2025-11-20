import React from 'react'
import styles from "./Footer.module.css"

const Footer = () => {
  return (
    <footer className={styles.footer}>
          <p>© 2024 Metro Transit. All Rights Reserved.</p>
          <div className={styles.footerLinks}>
            <a href="#" className={styles.link}>
              Terms of Service
            </a>
            <a href="#" className={styles.link}>
              Privacy Policy
            </a>
          </div>
        </footer>
  )
}

export default Footer