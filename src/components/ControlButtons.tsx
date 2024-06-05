import React from "react";
import { Button, Space } from "antd";

interface ControlButtonsProps {
  isAnswered: boolean;
  isLastQuestion: boolean;
  onNextQuestion: () => void;
  onSubmitTest: () => void;
  onAbortTest: () => void;
}

const ControlButtons: React.FC<ControlButtonsProps> = ({
  isAnswered,
  isLastQuestion,
  onNextQuestion,
  onSubmitTest,
  onAbortTest,
}) => {
  return (
    <Space style={{ marginTop: 20 }}>
      <Button type="default" onClick={onAbortTest}>
        Прервать
      </Button>
      <Button
        type="primary"
        onClick={isLastQuestion ? onSubmitTest : onNextQuestion}
        disabled={!isAnswered}
      >
        {isLastQuestion ? "Завершить" : "Следующий"}
      </Button>
    </Space>
  );
};

export default ControlButtons;
