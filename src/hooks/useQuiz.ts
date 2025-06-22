import { useEffect } from "react";
import type { Question, AnswerLabel, StoredState } from "../types";
import { usePersistentState } from "./usePersistentState";
import { shuffle } from "../utils/shuffle";

interface Params {
  quizId: string;
  questions: Question[];
  randomize: boolean;
  secondsPerQuestion: number | null; // null = no timer
  onFinish: (answers: AnswerLabel[]) => void;
}

export const useQuiz = ({
  quizId,
  questions,
  randomize,
  secondsPerQuestion,
  onFinish,
}: Params) => {
  const prepared = randomize ? shuffle(questions) : questions;
  const storageKey = `quiz-${quizId}`;

  const initialState: StoredState = {
    quizId,
    answers: [],
    current: 0,
    deadline: secondsPerQuestion
      ? Date.now() + secondsPerQuestion * prepared.length * 1000
      : 0,
  };

  const [state, setState] = usePersistentState<StoredState>(
    storageKey,
    initialState
  );

  const done = state.current >= prepared.length;

  /* avvisa App quando terminato */
  useEffect(() => {
    if (done) onFinish(state.answers);
  }, [done]);

  /* seleziona una risposta */
  const selectAnswer = (a: AnswerLabel): void => {
    if (done) return;
    setState((s) => ({
      ...s,
      answers: [...s.answers, a],
      current: s.current + 1,
    }));
  };

  /* termina immediatamente (correzione anticipata) */
  const finishNow = () => setState((s) => ({ ...s, current: prepared.length }));

  /* reset HARD: cancella localStorage e riparte */
  const reset = () => {
    localStorage.removeItem(storageKey);
    setState(initialState);
  };

  return {
    ...state,
    questions: prepared,
    done,
    selectAnswer,
    finishNow,
    reset,
  };
};
