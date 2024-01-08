import React, { useEffect, useState } from "react";

const Clock = () => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((oldTime) => oldTime + 1);
      console.log("Ticked");
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return <>Time: {time}</>;
};

export default Clock;
