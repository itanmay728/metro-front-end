import { useState } from "react";
import styles from "./Demo.module.css";

export default function Demo() {
  const [form, setForm] = useState({
    cardNumber: "",
    inDate: "",
    inTime: "",
    outTime: "",
    inStationName: "",
    outStationName: "",
    fare: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const auth = JSON.parse(localStorage.getItem("auth"));
      const token = auth?.token;

      const res = await fetch(
        "http://localhost:8080/api/customer/card-history",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(form),
        }
      );

      if (!res.ok) throw new Error("Failed to add card history");

      alert("✅ Card history added successfully");

      setForm({
        cardNumber: "",
        inDate: "",
        inTime: "",
        outTime: "",
        inStationName: "",
        outStationName: "",
        fare: "",
      });
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Add Demo Card History</h2>
      <p>Use this page to simulate a metro journey</p>

      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          name="cardNumber"
          placeholder="Card Number"
          value={form.cardNumber}
          onChange={handleChange}
          required
        />

        <input
          type="date"
          name="inDate"
          value={form.inDate}
          onChange={handleChange}
          required
        />

        <input
          type="time"
          name="inTime"
          value={form.inTime}
          onChange={handleChange}
          required
        />

        <input
          type="time"
          name="outTime"
          value={form.outTime}
          onChange={handleChange}
        />

        <input
          name="inStationName"
          placeholder="In Station"
          value={form.inStationName}
          onChange={handleChange}
          required
        />

        <input
          name="outStationName"
          placeholder="Out Station"
          value={form.outStationName}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          step="0.01"
          name="fare"
          placeholder="Fare (₹)"
          value={form.fare}
          onChange={handleChange}
        />

        <button type="submit">Add History</button>
      </form>
    </div>
  );
}
