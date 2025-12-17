import styles from "./CustomerDashboard.module.css";
import LiveClock from "../../../component/LiveClock/LiveClock";
import useCustomerDetails from "../useCustomerDetails";
import { useEffect } from "react";
import { getCardDetails } from "../../../api/customerCardDetails";
import { useDispatch } from "react-redux";
import { setCardData } from "../../../contextAPI/slices/CardDetailsSlice";

export default function CustomerDashboard() {
  const customerData = useCustomerDetails();
  const dispatch = useDispatch();

  useEffect(()=>{

    async function load() {
          const data = await getCardDetails();
          // setEmployees(data);
          console.log(data);
          localStorage.setItem("card", JSON.stringify(data.metroCard));
          dispatch(setCardData(data.metroCard))
        }
        load();
  }, [])

  return (
    <div className={styles.page}>
      <div className={styles.wrapper}>
        {/* HEADER */}
        <div className={styles.header}>
          <div>
            <h2>Welcome 👋</h2>
            <h1>{customerData.fullName}</h1>
            <p>{customerData.email}</p>
          </div>

          <div className={styles.time}>
            <LiveClock />
          </div>
        </div>

        {/* CARDS */}
        <div className={styles.cardsContainer}>
          {customerData.metroCards.map((card) => (
            <div key={card.cardId} className={styles.cardSection}>
              {/* LEFT CARD */}
              <div className={styles.cardWrapper}>
                <div className={styles.card}>
                  <div className={styles.cardTop}>
                    <span>{customerData.fullName}</span>
                    <span>{card.issueDate}</span>
                  </div>

                  <div className={styles.cardNumber}>
                    {card.cardNumber}
                  </div>

                  <div className={styles.cardBottom}>
                    <span>Metro Smart Card</span>
                    <span>₹ {card.balance}</span>
                  </div>
                </div>

                <button className={styles.deactivateBtn}>
                  Deactivate this card
                </button>
              </div>

              {/* RIGHT DETAILS */}
              <div className={styles.details}>
                <h3>Card Details</h3>

                <div className={styles.row}>
                  <span>Card Holder</span>
                  <span>{customerData.fullName}</span>
                </div>

                <div className={styles.row}>
                  <span>Card Number</span>
                  <span>{card.cardNumber}</span>
                </div>

                <div className={styles.row}>
                  <span>Issue Date</span>
                  <span>{card.issueDate}</span>
                </div>

                <div className={styles.row}>
                  <span>Status</span>
                  <span className={styles.active}>{card.status}</span>
                </div>

                <div className={styles.row}>
                  <span>Balance</span>
                  <span>₹ {card.balance}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
