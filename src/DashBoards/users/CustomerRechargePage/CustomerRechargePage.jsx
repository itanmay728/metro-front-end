import { useEffect, useState } from "react";
import styles from "./CustomerRechargePage.module.css";
import useCustomerDetails from "../useCustomerDetails";
import { rechargeCard } from "../../../api/customerRecharge";
import { celebratePayment } from "../celebratePayment";


export default function CustomerRechargePage() {
  const { metroCards } = useCustomerDetails();

  const [selectedCard, setSelectedCard] = useState(null);
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!metroCards || metroCards.length === 0) {
    return <p className={styles.empty}>No cards available</p>;
  }

   

  return (
    <div className={styles.wrapper}>
      {/* HEADER */}
      <div className={styles.pageHeader}>
        <h2>Recharge Your Metro Card</h2>
        <p>Fast, secure & hassle-free recharge</p>
      </div>

      {/* CARD GRID */}
      <div className={styles.cardGrid}>
        {metroCards.map((card) => (
          <div key={card.cardId} className={styles.cardWrapper}>
            <div className={styles.card}>
              <div className={styles.cardTop}>
                <span>{card.customer?.fullName || "Card Holder"}</span>
                <span>{card.issueDate}</span>
              </div>

              <div className={styles.cardNumber}>{card.cardNumber}</div>

              <div className={styles.cardBottom}>
                <span>Metro Smart Card</span>
                <span>₹ {card.balance}</span>
              </div>
            </div>

            <button
              className={styles.rechargeBtn}
              onClick={() => {
                setSelectedCard(card);
                setOpen(true);
                setStep(1);
                setAmount("");
              }}
            >
              Recharge Card
            </button>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {open && selectedCard && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h3>Recharge Card</h3>
              <span className={styles.close} onClick={() => setOpen(false)}>
                ✕
              </span>
            </div>

            <div className={styles.stepIndicator}>Step {step} of 2</div>

            {/* STEP 1 */}
            {step === 1 && (
              <div className={styles.step}>
                <label>Card Number</label>
                <input value={selectedCard.cardNumber} disabled />

                <label>Recharge Amount</label>
                <input
                  type="number"
                  placeholder="₹ Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />

                <button
                  className={styles.nextBtn}
                  disabled={!amount || amount <= 0}
                  onClick={() => setStep(2)}
                >
                  Continue to Payment
                </button>
              </div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <div className={styles.step}>
                <p>.....we can also set payment integration.....</p>
                <div className={styles.summary}>
                  <p>
                    <strong>Card:</strong> {selectedCard.cardNumber}
                  </p>
                  <p>
                    <strong>Amount:</strong> ₹ {amount}
                  </p>
                </div>

                <button
                  className={styles.payBtn}
                  disabled={loading}
                  onClick={async () => {
                    try {
                      setLoading(true);
                     let r =  await rechargeCard(selectedCard.cardId, amount);
                     celebratePayment();

                     setSuccess(true);
                      setOpen(false);
                    } catch (e) {
                      alert(e.message);
                    } finally {
                      setLoading(false);
                    }
                  }}
                >
                  {loading ? "Processing..." : `Pay ₹ ${amount}`}
                </button>

                <button className={styles.backBtn} onClick={() => setStep(1)}>
                  ← Back
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {success && (
  <div className={styles.modalOverlay}>
    <div className={styles.successModal}>
      <div className={styles.checkmark}>✓</div>
      <h2>Payment Successful</h2>
      <p>₹ {amount} added to your metro card</p>

      <button
        className={styles.doneBtn}
        onClick={() => setSuccess(false)}
      >
        Done
      </button>
    </div>
  </div>
)}

    </div>
  );
}
