import type { AnswerLabel, Question } from "../types";
import { Button } from "./Button";

interface Props {
  q: Question;
  index: number;
  total: number;
  onSelect: (a: AnswerLabel) => void;
}

export const QuestionCard = ({ q, index, total, onSelect }: Props) => (
  <div className="space-y-8">
    <h2 className="text-2xl font-semibold">
      {index}/{total} — {q.question}
    </h2>

    <div className="space-y-4">
      {" "}
      {/* ⬅️  padding tra bottoni */}
      {q.options.map((opt) => (
        <Button
          key={opt.label}
          variant="secondary"
          className="text-left w-full shadow-sm"
          onClick={() => onSelect(opt.label)}
        >
          <strong className="mr-3">{opt.label}.</strong> {opt.text}
        </Button>
      ))}
    </div>
  </div>
);
