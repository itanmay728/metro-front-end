import useCustomerDetails from "../useCustomerDetails";
import styles from "./CustomerCardHistory.module.css";

export default function CustomerCardHistory() {
  // dummy data (replace with API response later)
  let customerData = useCustomerDetails();
  const history = customerData.cardHistory;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Card History</h2>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>#</th>
              <th>In Date</th>
              <th>In Station Name</th>
               <th>In Time</th>
              <th>Out Station Name</th>
              <th>Out Time</th>
              <th>Fare</th>
            </tr>
          </thead>

          <tbody>
            {history.map((h, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{h.inDate}</td>
                <td>{h.inStationName}</td>
                <td>{h.inTime}</td>
                <td>{h.outStationName}</td>
              
                <td>{h.outTime}</td>
                <td className={styles.fare}>{h.fare}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
