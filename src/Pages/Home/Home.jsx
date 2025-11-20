import React, { useState } from "react";
import styles from "./Home.module.css";

const Home = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [toSuggestions, setToSuggestions] = useState([]);

  const [route, setRoute] = useState(null);

  // =========================================
  // AUTOCOMPLETE SEARCH
  // =========================================
  const fetchStations = async (query, setter) => {
    if (query.length < 2) return setter([]);

    const res = await fetch(
      `http://localhost:8080/api/metro/search?query=${query}`
    );
    const data = await res.json();
    setter(data);
  };

  // =========================================
  // FIND ROUTE
  // =========================================
  const handleFindRoute = async () => {
    if (!from || !to) return;

    const res = await fetch(
      `http://localhost:8080/api/metro/route?from=${from}&to=${to}`
    );
    const data = await res.json();
    setRoute(data);
  };

  // =========================================
  // SWAP BUTTON
  // =========================================
  const handleSwap = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
  };

  // =========================================
  // MAIN UI
  // =========================================
  return (
    <div className={styles.container}>
      {/* LEFT PANEL */}
      <div className={styles.left}>
        <h1 className={styles.heading}>Plan Your Journey</h1>
        <p className={styles.subtext}>
          Enter your start and end stations to find the best route across the
          Delhi Metro network.
        </p>

        <div className={styles.inputGroup}>
          {/* FROM INPUT */}
          <div className={styles.inputWrapper}>
            <label>From Station</label>
            <input
              type="text"
              value={from}
              placeholder="Enter starting station"
              onChange={(e) => {
                setFrom(e.target.value);
                fetchStations(e.target.value, setFromSuggestions);
              }}
            />

            {/* DROPDOWN */}
            {fromSuggestions.length > 0 && (
              <ul className={styles.dropdown}>
                {fromSuggestions.map((s) => (
                  <li
                    key={s.id}
                    onClick={() => {
                      setFrom(s.name);
                      setFromSuggestions([]);
                    }}
                  >
                    {s.name}
                    <span
                      className={styles.lineColor}
                      style={{ background: s.color }}
                    ></span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* SWAP BUTTON */}
          <button className={styles.swapBtn} onClick={handleSwap}>
            ⇅
          </button>

          {/* TO INPUT */}
          <div className={styles.inputWrapper}>
            <label>To Station</label>
            <input
              type="text"
              value={to}
              placeholder="Enter destination station"
              onChange={(e) => {
                setTo(e.target.value);
                fetchStations(e.target.value, setToSuggestions);
              }}
            />

            {/* DROPDOWN */}
            {toSuggestions.length > 0 && (
              <ul className={styles.dropdown}>
                {toSuggestions.map((s) => (
                  <li
                    key={s.id}
                    onClick={() => {
                      setTo(s.name);
                      setToSuggestions([]);
                    }}
                  >
                    {s.name}
                    <span
                      className={styles.lineColor}
                      style={{ background: s.color }}
                    ></span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* FIND ROUTE */}
          <button className={styles.findBtn} onClick={handleFindRoute}>
            Find Route
          </button>
        </div>
      </div>

      {/* RIGHT ROUTE PANEL */}
      <div className={styles.right}>
        {!route ? (
          <div className={styles.routeCardEmpty}>
            <h3 className={styles.emptyTitle}>No Route Selected</h3>
            <p className={styles.emptyText}>
              Enter your <strong>From</strong> and <strong>To</strong> stations
              and click <strong>Find Route</strong> to see your journey here.
            </p>

            <div className={styles.placeholderSteps}>
              <div className={styles.placeholderRow}>
                <span className={styles.placeholderDot}></span>
                <div className={styles.placeholderBar}></div>
              </div>
              <div className={styles.placeholderRow}>
                <span className={styles.placeholderDot}></span>
                <div className={styles.placeholderBar}></div>
              </div>
              <div className={styles.placeholderRow}>
                <span className={styles.placeholderDot}></span>
                <div className={styles.placeholderBar}></div>
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.routeCard}>
            <div className={styles.routeHeader}>
              <div>
                <p className={styles.label}>Your Route</p>
                <h3>
                  {from} → {to}
                </h3>
              </div>
              <div className={styles.time}>
                <p className={styles.label}>Total Stops</p>
                <h3 className={styles.primary}>{route.totalStations}</h3>
              </div>
            </div>

            <ol className={styles.stops}>
              {route.stations.map((s, index) => (
                <React.Fragment key={s.id}>
                  {s.interchange && (
                    <li className={styles.interchangeNotice}>
                      🔁 Change to{" "}
                      <strong style={{ color: s.color }}>{s.lineName}</strong>
                    </li>
                  )}

                  <li>
                    <span
                      className={styles.lineColor}
                      style={{ background: s.color }}
                    ></span>
                    {s.name} — <strong>{s.lineName}</strong>
                  </li>
                </React.Fragment>
              ))}
            </ol>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
