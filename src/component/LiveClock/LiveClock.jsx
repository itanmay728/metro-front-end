// components/LiveClock.jsx
import { useEffect, useState, memo } from "react";

const LiveClock = memo(() => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      {now.toLocaleDateString()} <br />
      {now.toLocaleTimeString()}
    </div>
  );
});

export default LiveClock;
