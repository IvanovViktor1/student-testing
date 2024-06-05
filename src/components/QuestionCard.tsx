import React, { useState } from "react";
import { Card, Radio, Checkbox, Typography, Input } from "antd";

const { Paragraph } = Typography;
const { TextArea } = Input;

interface QuestionCardProps {
  id: number;
  question: string;
  answers?: string[];
  multipleChoice?: boolean;
  answerType: "short" | "long" | "choice";
  onAnswerChange: (id: number, selectedAnswers: string[] | string) => void;
  disabled: boolean;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  id,
  question,
  answers = [],
  multipleChoice = false,
  answerType = "choice",
  onAnswerChange,
  disabled,
}) => {
  const [selectedAnswers, setSelectedAnswers] = useState<string[] | string>(
    multipleChoice ? [] : ""
  );

  const handleChoiceChange = (selected: string[]) => {
    if (!disabled) {
      setSelectedAnswers(selected);
      onAnswerChange(id, selected);
    }
  };

  const handleRadioChange = (e: any) => {
    if (!disabled) {
      const value = [e.target.value];
      setSelectedAnswers(value);
      onAnswerChange(id, value);
    }
  };

  const handleTextChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!disabled) {
      const value = e.target.value;
      setSelectedAnswers(value);
      onAnswerChange(id, value);
    }
  };

  return (
    <Card title="Вопрос">
      <Paragraph>{question}</Paragraph>
      {answerType === "choice" ? (
        multipleChoice ? (
          <Checkbox.Group onChange={handleChoiceChange} disabled={disabled}>
            {answers.map((answer, index) => (
              <Checkbox key={index} value={answer}>
                {answer}
              </Checkbox>
            ))}
          </Checkbox.Group>
        ) : (
          <Radio.Group onChange={handleRadioChange} disabled={disabled}>
            {answers.map((answer, index) => (
              <Radio key={index} value={answer}>
                {answer}
              </Radio>
            ))}
          </Radio.Group>
        )
      ) : answerType === "short" ? (
        <Input onChange={handleTextChange} disabled={disabled} />
      ) : (
        <TextArea rows={4} onChange={handleTextChange} disabled={disabled} />
      )}
    </Card>
  );
};

export default React.memo(QuestionCard);
