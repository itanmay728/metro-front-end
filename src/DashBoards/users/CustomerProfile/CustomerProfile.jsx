import useCustomerDetails from "../useCustomerDetails";
import styles from "./CustomerProfile.module.css";

export default function CustomerProfile() {
  let customerData = useCustomerDetails()
  // const customer = {
  //   fullName: "Tanmay Kumar",
  //   email: "tanmay@gmail.com",
  //   phone: "6202907277",
  //   address: "New Delhi, Dwarka Sector 3",
  //   aadhar: "XXXX XXXX 0876",
  //   joinedOn: "12 Dec 2024",
  //   status: "Active",
  // };
  const customer = customerData;

  return (
    <div className={styles.wrapper}>
      {/* HEADER */}
      <div className={styles.header}>
        <div>
          <h2>My Profile</h2>
          <p>Manage your personal information</p>
        </div>
      </div>

      {/* PROFILE CARD */}
      <div className={styles.profileCard}>
        {/* LEFT */}
        <div className={styles.left}>
          <div className={styles.avatar}>
            {customer.fullName.charAt(0)}
          </div>
          <h3>{customer.fullName}</h3>
          <span className={styles.status}>Active</span>
        </div>

        {/* RIGHT */}
        <div className={styles.right}>
          <h4>Personal Details</h4>

          <div className={styles.row}>
            <span>Email</span>
            <span>{customer.email}</span>
          </div>

          <div className={styles.row}>
            <span>Phone</span>
            <span>{customer.phoneNumber}</span>
          </div>

          <div className={styles.row}>
            <span>Address</span>
            <span>{customer.address}</span>
          </div>

          <div className={styles.row}>
            <span>Aadhar</span>
            <span>{customer.aadharNumber}</span>
          </div>

          <div className={styles.row}>
            <span>customer Code</span>
            <span>{customer.customerCode}</span>
          </div>

          <button className={styles.editBtn}>Edit Profile</button>
        </div>
      </div>
    </div>
  );
}
