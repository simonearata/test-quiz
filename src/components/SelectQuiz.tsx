import type { QuizData } from "../types";
interface SQProps {
  quizzes: QuizData[];
  onSelect: (id: string) => void;
}
export const SelectQuiz = ({ quizzes, onSelect }: SQProps) => (
  <select
    onChange={(e) => onSelect(e.target.value)}
    className="border p-2 rounded dark:text-[#0f172a]"
  >
    <option value="">Seleziona un quiz…</option>
    {quizzes.map((q) => (
      <option key={q.id} value={q.id}>
        {q.name}
      </option>
    ))}
  </select>
);
