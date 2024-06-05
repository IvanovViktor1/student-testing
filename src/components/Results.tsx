import React from "react";
import { test } from "../data/testData";
import { Button, Typography, List, Card } from "antd";
import styles from "../styles/app.module.scss";

interface ResultsProps {
  results: { [id: number]: string | string[] };
  onRestart: () => void;
}

const Results: React.FC<ResultsProps> = ({ results, onRestart }) => (
  <div className={styles.resultsBlock}>
    <Typography.Title level={3}>Результаты теста</Typography.Title>
    <List
      grid={{ gutter: 16, column: 1 }}
      dataSource={Object.entries(results)}
      renderItem={([id, answer]) => {
        const questionText = test.questions.find(
          (q) => q.id === Number(id)
        )?.question;
        return (
          <List.Item>
            <Card title={questionText}>
              {Array.isArray(answer) ? answer.join(", ") : answer}
            </Card>
          </List.Item>
        );
      }}
    />
    <Button type="primary" onClick={onRestart} style={{ marginTop: 20 }}>
      Пройти заново
    </Button>
  </div>
);

export default Results;
