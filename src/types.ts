export type AnswerLabel = "A" | "B" | "C" | "D";

export interface Option {
  label: AnswerLabel;
  text: string;
}

export interface Question {
  id: number;
  question: string;
  options: Option[];
  correct: AnswerLabel;
}

export interface QuizData {
  id: string; // uuid o filename
  name: string; // label visibile
  questions: Question[];
}

export interface StoredState {
  quizId: string;
  answers: AnswerLabel[];
  current: number;
  deadline: number; // ms (0 = no timer)
}
