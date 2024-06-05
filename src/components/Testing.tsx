import React, { FC, useState, useEffect, useCallback } from "react";
import { Button, Typography, notification } from "antd";
import QuestionCard from "./QuestionCard";
import Timer from "./Timer";
import Results from "./Results";
import { test } from "../data/testData";
import styles from "../styles/app.module.scss";
import ControlButtons from "./ControlButtons";
import ProgressBar from "./ProgressBar";

const { Paragraph } = Typography;

const Testing: FC = () => {
  const [results, setResults] = useState<{ [id: number]: string | string[] }>(
    () => {
      const savedResults = localStorage.getItem("results");
      return savedResults ? JSON.parse(savedResults) : {};
    }
  );
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(
    () => {
      const savedAnsweredQuestions = localStorage.getItem("answeredQuestions");
      return savedAnsweredQuestions
        ? new Set(JSON.parse(savedAnsweredQuestions))
        : new Set();
    }
  );
  const [currentSlide, setCurrentSlide] = useState<number>(() => {
    const savedSlide = localStorage.getItem("currentSlide");
    return savedSlide ? parseInt(savedSlide, 10) : 0;
  });
  const [timeLeft, setTimeLeft] = useState<number>(() => {
    const savedTimeLeft = localStorage.getItem("timeLeft");
    return savedTimeLeft ? parseInt(savedTimeLeft, 10) : test.timeLimit ?? 0;
  });
  const [isTestComplete, setIsTestComplete] = useState<boolean>(false);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [hasStarted, setHasStarted] = useState<boolean>(() => {
    return localStorage.getItem("hasStarted") === "true";
  });

  const handleFinalSubmit = useCallback(() => {
    console.log("Results:", results);
    localStorage.removeItem("results");
    localStorage.removeItem("currentSlide");
    localStorage.removeItem("timeLeft");
    localStorage.removeItem("answeredQuestions");
    localStorage.removeItem("hasStarted");
    setIsTestComplete(true);
  }, [results]);

  const handleTimeUp = useCallback(() => {
    notification.warning({
      message: "Время вышло",
      description:
        "Ваше время для выполнения теста истекло. Результаты сохранены.",
    });
    handleFinalSubmit();
  }, [handleFinalSubmit]);

  useEffect(() => {
    if (!isTestComplete) {
      localStorage.setItem("results", JSON.stringify(results));
      localStorage.setItem("currentSlide", currentSlide.toString());
      localStorage.setItem(
        "answeredQuestions",
        JSON.stringify(Array.from(answeredQuestions))
      );
      localStorage.setItem("timeLeft", timeLeft.toString());
      localStorage.setItem("hasStarted", hasStarted.toString());
    }
  }, [
    results,
    currentSlide,
    isTestComplete,
    answeredQuestions,
    timeLeft,
    hasStarted,
  ]);

  useEffect(() => {
    const currentQuestion = test.questions[currentSlide];
    const answer = results[currentQuestion.id];
    if (Array.isArray(answer)) {
      setIsAnswered(answer.length > 0);
    } else {
      setIsAnswered(answer ? (answer as string).trim() !== "" : false);
    }
  }, [results, currentSlide]);

  const handleAnswerChange = useCallback(
    (id: number, answer: string[] | string) => {
      const newResults = { ...results, [id]: answer };
      setResults(newResults);
    },
    [results]
  );

  const handleNextQuestion = useCallback(() => {
    setAnsweredQuestions((prev) =>
      new Set(prev).add(test.questions[currentSlide].id)
    );
    if (currentSlide < test.questions.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  }, [currentSlide]);

  const handleRestart = () => {
    setResults({});
    setAnsweredQuestions(new Set());
    setCurrentSlide(0);
    setTimeLeft(test.timeLimit ?? 0);
    setIsTestComplete(false);
    setHasStarted(false);
    localStorage.removeItem("results");
    localStorage.removeItem("currentSlide");
    localStorage.removeItem("timeLeft");
    localStorage.removeItem("answeredQuestions");
    localStorage.removeItem("hasStarted");
  };

  const handleStart = () => {
    setHasStarted(true);
    setTimeLeft(test.timeLimit ?? 0);
  };

  const handleAbort = () => {
    setResults({});
    setAnsweredQuestions(new Set());
    setCurrentSlide(0);
    setTimeLeft(test.timeLimit ?? 0);
    setIsTestComplete(false);
    setHasStarted(false);
    localStorage.removeItem("results");
    localStorage.removeItem("currentSlide");
    localStorage.removeItem("timeLeft");
    localStorage.removeItem("answeredQuestions");
    localStorage.removeItem("hasStarted");
  };

  return (
    <div className={styles.testBlock} tabIndex={-1}>
      {!hasStarted ? (
        <div style={{ textAlign: "center", padding: 20 }}>
          <Button type="primary" size="large" onClick={handleStart}>
            Начать тестирование
          </Button>
        </div>
      ) : !isTestComplete ? (
        <>
          <Paragraph>Вопросы</Paragraph>
          <Timer initialTime={timeLeft} onTimeUp={handleTimeUp} />
          <ProgressBar answeredQuestions={answeredQuestions} />
          <div>
            <QuestionCard
              id={test.questions[currentSlide].id}
              question={test.questions[currentSlide].question}
              answers={test.questions[currentSlide].answers}
              multipleChoice={test.questions[currentSlide].multipleChoice}
              answerType={test.questions[currentSlide].answerType}
              onAnswerChange={handleAnswerChange}
              disabled={isTestComplete}
            />
          </div>
          <ControlButtons
            isAnswered={isAnswered}
            isLastQuestion={currentSlide === test.questions.length - 1}
            onNextQuestion={handleNextQuestion}
            onSubmitTest={handleFinalSubmit}
            onAbortTest={handleAbort}
          />
        </>
      ) : (
        <Results results={results} onRestart={handleRestart} />
      )}
    </div>
  );
};

export default Testing;
