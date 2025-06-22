import { useQuiz } from "../hooks/useQuiz";
import { QuestionCard } from "./QuestionCard";
import { Results } from "./Results";
import { ProgressBar } from "./ProgressBar";
import { useTimer } from "../hooks/useTimer";
import { Card } from "./CardWrapper";
import { Button } from "./Button";
import type { Question } from "../types";

interface Props {
  quizId: string;
  bank: Question[];
  randomize: boolean;
  secondsPerQuestion: number | null;
  restart: () => void;
}

export const Quiz = ({
  quizId,
  bank,
  randomize,
  secondsPerQuestion,
  restart,
}: Props) => {
  const {
    questions,
    current,
    answers,
    done,
    selectAnswer,
    reset,
    finishNow,
    deadline,
  } = useQuiz({
    quizId,
    questions: bank,
    randomize,
    secondsPerQuestion,
    onFinish: () => {},
  });

  const { secondsLeft, expired } = useTimer(deadline || null);

  if (expired || done)
    return (
      <Card>
        <Results
          bank={questions}
          answers={answers}
          reset={reset}
          restart={restart}
        />
      </Card>
    );

  return (
    <Card>
      {secondsLeft !== null && (
        <p className="text-right text-sm">
          ⏱️ <strong>{secondsLeft}s</strong>
        </p>
      )}

      {/* <ProgressBar value={current / questions.length} /> */}

      <QuestionCard
        q={questions[current]}
        index={current + 1}
        total={questions.length}
        onSelect={selectAnswer}
      />

      <div className="flex flex-wrap gap-2 pt-6">
        <div className="flex flex-wrap gap-4 pt-8">
          <div className="flex flex-wrap gap-4 pt-8">
            <div className="flex flex-wrap gap-4 pt-10">
              <Button
                variant="ghost"
                onClick={() => {
                  reset();
                  restart();
                }}
              >
                Abbandona
              </Button>
              <Button variant="primary" onClick={finishNow} className="">
                Termina e correggi ora
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
