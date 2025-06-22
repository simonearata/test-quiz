import { saveAs } from "file-saver";
import { Button } from "./Button";
import { Check, X } from "lucide-react";
import type { AnswerLabel, Question } from "../types";

interface Props {
  bank: Question[];
  answers: AnswerLabel[];
  reset: () => void;
  restart: () => void;
}

export const Results = ({ bank, answers, reset, restart }: Props) => {
  const score = bank.reduce(
    (tot, q, i) => (q.correct === answers[i] ? tot + 1 : tot),
    0
  );

  const exportCSV = () => {
    const header = "id,question,correct,user\n";
    const rows = bank
      .map(
        (q, i) =>
          `${q.id},"${q.question.replace(/\"/g, '""')}",${q.correct},${
            answers[i] ?? ""
          }`
      )
      .join("\n");
    saveAs(
      new Blob([header + rows], { type: "text/csv;charset=utf-8;" }),
      "report_quiz.csv"
    );
  };

  return (
    <div className="space-y-10">
      <h2 className="text-3xl font-bold">
        Punteggio: {score}/{bank.length}
      </h2>

      <Button variant="secondary" onClick={exportCSV}>
        Scarica CSV
      </Button>

      <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-2">
        {bank.map((q, i) => {
          const user = answers[i];
          const ok = q.correct === user;

          /*  classi del contenitore */
          const wrapCls =
            "rounded-xl p-4 space-y-3 border-2 " +
            (ok
              ? "border-emerald-400 bg-emerald-400/10"
              : "border-rose-400 bg-rose-400/10");

          /* titolo domanda */
          const titleCls = ok ? "" : "text-rose-300";

          return (
            <details key={q.id} className={wrapCls} open>
              <summary className={`cursor-pointer font-medium ${titleCls}`}>
                {i + 1}. {q.question}
              </summary>

              <ul className="ml-6 space-y-1 list-disc">
                {q.options.map((o) => {
                  const isCorrect = o.label === q.correct;
                  const isUser = o.label === user;

                  return (
                    <li key={o.label} className="flex items-start gap-2">
                      {/* icone */}
                      {isCorrect && (
                        <Check size={16} className="text-emerald-300 mt-0.5" />
                      )}
                      {isUser && !isCorrect && (
                        <X size={16} className="text-rose-400 mt-0.5" />
                      )}
                      {/* testo */}
                      <span
                        className={
                          isCorrect
                            ? "text-emerald-200 font-semibold"
                            : isUser
                            ? "text-rose-300 line-through"
                            : "opacity-80"
                        }
                      >
                        {o.label}. {o.text}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </details>
          );
        })}
      </div>

      <div className="flex gap-4">
        <Button
          onClick={() => {
            reset();
            restart();
          }}
        >
          Ricomincia
        </Button>
      </div>
    </div>
  );
};
