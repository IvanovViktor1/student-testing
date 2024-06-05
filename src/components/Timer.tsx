import React, { useEffect, useState, useRef } from "react";
import { Typography, Progress } from "antd";

const { Paragraph } = Typography;

interface TimerProps {
  initialTime: number;
  onTimeUp: () => void;
}

const Timer: React.FC<TimerProps> = ({ initialTime, onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (timeLeft > 0) {
      timerRef.current = window.setInterval(() => {
        setTimeLeft((prevTimeLeft) => {
          const newTimeLeft = prevTimeLeft - 1;
          localStorage.setItem("timeLeft", newTimeLeft.toString());
          if (newTimeLeft <= 0) {
            clearInterval(timerRef.current!);
            onTimeUp();
          }
          return newTimeLeft;
        });
      }, 1000);
    } else {
      onTimeUp();
    }

    return () => clearInterval(timerRef.current!);
  }, [timeLeft, onTimeUp]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="timer">
      <Paragraph>Оставшееся время:</Paragraph>
      <Progress
        type="circle"
        percent={(timeLeft / initialTime) * 100}
        format={() => formatTime(timeLeft)}
        width={80}
      />
    </div>
  );
};

export default React.memo(Timer);
