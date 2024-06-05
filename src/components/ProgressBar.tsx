import React from "react";
import { Steps } from "antd";
import { test } from "../data/testData";

const { Step } = Steps;

interface ProgressBarProps {
  answeredQuestions: Set<number>;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ answeredQuestions }) => {
  const currentStep = answeredQuestions.size;

  return (
    <Steps size="small" current={currentStep} style={{ marginBottom: 20 }}>
      {test.questions.map((question, index) => (
        <Step
          key={index}
          status={answeredQuestions.has(question.id) ? "finish" : "wait"}
        />
      ))}
    </Steps>
  );
};

export default ProgressBar;
