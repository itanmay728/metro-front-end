import React from "react";
import styles from "./About.module.css";

const About = () => {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        {/* Page Heading */}
        <div className={styles.pageHeading}>
          <span className={`material-symbols-outlined ${styles.icon}`}>
            info
          </span>
          <h1 className={styles.title}>About Metro</h1>
        </div>

        {/* Section 1: About the Metro System */}
        <section className={styles.section}>
          <div className={styles.textContent}>
            <h2 className={styles.sectionTitle}>Our Metro System</h2>
            <p className={styles.paragraph}>
              A brief paragraph describing the metro's mission, service area,
              and commitment to providing a safe, reliable, and efficient
              transit experience for all travelers in the region. We are
              dedicated to connecting communities and making your journey
              seamless and enjoyable.
            </p>
          </div>
          <div className={styles.imageContainer}>
            <div
              className={styles.image}
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD7XOJ0BkEGx4QmsM8cv2HkCphPvzRQGhZ9aGGoxyiGqZxIordf8O5VAJBi14QRNSXVcdNyGcaniI1LWRUQrNWW3FUdtK7kyZJDirijWmT8AmDPMwyl2L371F56EV3cOS_PB0vFIkXYv84tSroHN33HiDvdWMvykbsqK0iuKgFrSiWZKl69gg2981pJ9jrIEC8ecdd-1Q4-sq9_eJQAhmLZc8dVVuh1PPktqvBzZfIz5b-SfAQhfyqKVXRNexKvSIwqL8iVYthklbc')",
              }}
            ></div>
          </div>
        </section>

        <hr className={styles.divider} />

        {/* Section 2 + 3 */}
        <div className={styles.grid}>
          <section className={styles.card}>
            <h2 className={styles.sectionTitle}>Our History</h2>
            <p className={styles.paragraph}>
              A concise summary of key milestones and the evolution of the metro
              system. From our humble beginnings in the late 20th century to
              becoming a leading urban transit network, our journey is one of
              growth, innovation, and unwavering public service.
            </p>
          </section>

          <section className={styles.card}>
            <h2 className={styles.sectionTitle}>
              Commitment to Safety & Sustainability
            </h2>
            <p className={styles.paragraph}>
              Your safety is our top priority. We employ state-of-the-art
              security measures and rigorous maintenance protocols. We are also
              committed to a greener future, investing in energy-efficient
              trains and sustainable operational practices to reduce our carbon
              footprint.
            </p>
          </section>
        </div>

        <hr className={styles.divider} />

        {/* Section 4: Contact Us */}
        <section className={styles.contactSection}>
          <div className={styles.contactHeader}>
            <h2 className={styles.contactTitle}>Get in Touch</h2>
            <p className={styles.contactSubtitle}>
              We'd love to hear from you. Here's how you can reach us.
            </p>
          </div>

          <div className={styles.contactGrid}>
            <div className={styles.contactCard}>
              <span
                className={`material-symbols-outlined ${styles.contactIcon}`}
              >
                mail
              </span>
              <h3 className={styles.contactHeading}>Email</h3>
              <a href="mailto:contact@metro.com" className={styles.link}>
                contact@metro.com
              </a>
            </div>

            <div className={styles.contactCard}>
              <span
                className={`material-symbols-outlined ${styles.contactIcon}`}
              >
                call
              </span>
              <h3 className={styles.contactHeading}>Phone</h3>
              <a href="tel:+1234567890" className={styles.link}>
                +1 (234) 567-890
              </a>
            </div>

            <div className={styles.contactCard}>
              <span
                className={`material-symbols-outlined ${styles.contactIcon}`}
              >
                location_on
              </span>
              <h3 className={styles.contactHeading}>Address</h3>
              <p className={styles.paragraph}>
                123 Metro Plaza, Transit City, 10001
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        
      </div>
    </main>
  );
};

export default About;
