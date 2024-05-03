import React, { useState, useEffect } from 'react';

interface CountdownButtonProps {
  createdAt: number; // Assuming createdAt is a Unix timestamp in seconds
  additionalDays: number;
}

const CountdownButton: React.FC<CountdownButtonProps> = ({ createdAt, additionalDays }) => {
  const calculateRemainingTime = (): number => {
    const currentTime = Math.floor(Date.now() / 1000);
    const expirationTime = createdAt + additionalDays * 86400; // 86400 seconds in a day
    const remainingTime = expirationTime - currentTime;

    return remainingTime >= 0 ? remainingTime : -1;
  };

  const [remainingTime, setRemainingTime] = useState(calculateRemainingTime());

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime(calculateRemainingTime());
    }, 1000);

    return () => clearInterval(timer);
  }, [createdAt, additionalDays]);

  const formatTime = (time: number): string => {
    const days = Math.floor(time / 86400);
    const hours = Math.floor((time % 86400) / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    return `${days > 0 ? `${days}D:` : ''}${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <button className="btn btn_success">
      {remainingTime >= 0 ? `Remaining Time - ${formatTime(remainingTime)}` : "Time expired"}
    </button>
  );
};

export default CountdownButton;
