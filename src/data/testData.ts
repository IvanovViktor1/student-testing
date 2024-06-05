export interface Question {
  id: number;
  question: string;
  answers?: string[];
  multipleChoice?: boolean;
  answerType: "short" | "long" | "choice";
}

export interface Test {
  questions: Question[];
  timeLimit?: number;
}

export const test: Test = {
  questions: [
    {
      id: 1,
      question: "Почему программисты не ходят на природу?",
      answers: [
        "Они боятся багов",
        "Им не нужен свежий воздух",
        "Они предпочитают виртуальные миры",
      ],
      multipleChoice: false,
      answerType: "choice",
    },
    {
      id: 2,
      question: "Какое любимое блюдо у программистов?",
      answers: ["Пицца", "Бургеры", "Суши", "Кофе"],
      multipleChoice: true,
      answerType: "choice",
    },
    {
      id: 3,
      question: "Что программисты считают идеальным днем?",
      answerType: "short",
    },
    {
      id: 4,
      question:
        "Объясните, почему вы считаете, что JavaScript – это лучший язык программирования?",
      answerType: "long",
    },
    {
      id: 5,
      question: "Почему компьютер работает быстрее ночью?",
      answers: ["Меньше нагрузки в сети", "Компьютер выспался", "Меньше помех"],
      multipleChoice: false,
      answerType: "choice",
    },
    {
      id: 6,
      question: "Какая клавиша самая любимая у программистов?",
      answers: ["F5", "Ctrl+C", "Ctrl+V", "Esc"],
      multipleChoice: false,
      answerType: "choice",
    },
    {
      id: 7,
      question: "Какая ошибка в программировании вам больше всего запомнилась?",
      answerType: "long",
    },
    {
      id: 8,
      question:
        "Какой язык программирования вы бы посоветовали изучать новичкам?",
      answerType: "short",
    },
    {
      id: 9,
      question: "Почему программисты предпочитают темные темы?",
      answers: [
        "Меньше напрягает глаза",
        "Выглядит стильно",
        "Экономит энергию",
      ],
      multipleChoice: true,
      answerType: "choice",
    },
    {
      id: 10,
      question:
        "Если бы вы могли выбрать любой супергеройский навык, что бы это было и почему?",
      answerType: "long",
    },
  ],
  timeLimit: 300, // 5 минут
};
