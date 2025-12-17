// src/pages/AllCustomers/AllCustomers.jsx
import { useEffect, useState } from "react";
import styles from "./AllCustomersDetails.module.css";

export default function AllCustomersDetails() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadCustomers() {
      try {
        const auth = JSON.parse(localStorage.getItem("auth"));
        const token = auth?.token;

        const res = await fetch("http://localhost:8080/api/admin/allcustomer", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to load customers");
        }

        const data = await res.json();
        
        setCustomers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadCustomers();
  }, []);

  if (loading) return <p className={styles.info}>Loading customers...</p>;
  if (error) return <p className={styles.error}>{error}</p>;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Customers List</h2>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>#</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Aadhar</th>
              <th>Address</th>
              <th>Created At</th>
            </tr>
          </thead>

          <tbody>
            {customers.length === 0 ? (
              <tr>
                <td colSpan="7" className={styles.empty}>
                  No customers found
                </td>
              </tr>
            ) : (
              customers.map((c, index) => (
                <tr key={c.customerId}>
                  <td>{index + 1}</td>
                  <td>{c.fullName}</td>
                  <td>{c.emailId}</td>
                  <td>{c.phoneNumber}</td>
                  <td>{c.aadharNumber}</td>
                  <td>{c.address}</td>
                  <td>{new Date(c.createdAt).toLocaleDateString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
