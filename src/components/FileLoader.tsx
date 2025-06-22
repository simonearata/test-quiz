import { useState, type ChangeEvent } from "react";
import { v4 as uuid } from "uuid";
import type { Question, QuizData } from "../types";

interface FLProps {
  onLoaded: (quiz: QuizData) => void;
}

export const FileLoader = ({ onLoaded }: FLProps) => {
  const [error, setError] = useState<string | null>(null);

  const handle = (e: ChangeEvent<HTMLInputElement>): void => {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const json = JSON.parse(ev.target?.result as string);
        if (!Array.isArray(json))
          throw new Error("Il file non contiene un array");
        const questions = json as Question[];
        if (!questions.every((q) => q.question && q.options && q.correct))
          throw new Error("Struttura JSON non valida");
        onLoaded({ id: uuid(), name: f.name, questions });
        setError(null);
      } catch (err) {
        setError((err as Error).message);
      }
    };
    reader.readAsText(f, "utf-8");
  };

  return (
    <div className="flex flex-col gap-2">
      <input type="file" accept="application/json" onChange={handle} />
      {error && <p className="text-red-600 text-sm">Errore: {error}</p>}
    </div>
  );
};
