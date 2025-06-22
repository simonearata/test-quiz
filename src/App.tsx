import { useEffect, useState } from "react";
import { ThemeToggle } from "./components/ThemeToggle";
import { FileLoader } from "./components/FileLoader";
import { SelectQuiz } from "./components/SelectQuiz";
import { Quiz } from "./components/Quiz";
import { shuffle } from "./utils/shuffle";
import type { QuizData } from "./types";
import { Card } from "./components/CardWrapper";
import { Button } from "./components/Button";
import { PromptInfo } from "./components/PromptInfo";
import { Login } from "./components/Login";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [quizzes, setQuizzes] = useState<QuizData[]>([]);
  const [activeId, setActiveId] = useState("");
  const [limit, setLimit] = useState(100);
  const [randomize, setRandomize] = useState(true);
  const [secPerQ, setSecPerQ] = useState<number | null>(null);

  const activeQuiz = quizzes.find((q) => q.id === activeId);

  useEffect(() => {
    setLoggedIn(localStorage.getItem("loggedIn") === "true");
  }, []);

  if (!loggedIn) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4">
        <Login onLogin={() => setLoggedIn(true)} />
      </main>
    );
  }

  return (
    <main className="container flex flex-col items-center gap-12 py-14">
      {/* HERO */}
      <header className="space-y-6 text-center max-w-3xl">
        <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-primary to-emerald-600 text-transparent bg-clip-text drop-shadow">
          Quiz Sostenibilità
        </h1>

        <p className="text-lg leading-relaxed max-w-xl mx-auto">
          Carica un file JSON di domande, scegli quante somministrare e metti
          alla prova le tue conoscenze
        </p>

        <div className="flex items-center justify-center gap-4">
          <ThemeToggle />
          <button
            onClick={() => {
              localStorage.removeItem("loggedIn");
              setLoggedIn(false);
            }}
            className="text-sm text-red-500 underline"
          >
            Logout
          </button>
        </div>

        <PromptInfo />
      </header>

      {/* SETUP */}
      {!activeQuiz && (
        <Card>
          <div className="space-y-6">
            <FileLoader onLoaded={(q) => setQuizzes((prev) => [...prev, q])} />

            {quizzes.length > 0 && (
              <div className="space-y-6">
                <SelectQuiz quizzes={quizzes} onSelect={setActiveId} />

                {/* FORM GRID */}
                <div className="grid md:grid-cols-2 gap-6">
                  <label className="flex flex-col gap-2">
                    <span className="font-medium">Domande da usare</span>
                    <input
                      type="number"
                      min={1}
                      max={activeQuiz?.questions.length ?? 300}
                      value={limit}
                      onChange={(e) => setLimit(+e.target.value)}
                      className="border rounded-md p-2 w-full dark:text-[#0f172a]"
                    />
                  </label>

                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      className="w-5 h-5 accent-primary dark:text-[#0f172a]"
                      checked={randomize}
                      onChange={(e) => setRandomize(e.target.checked)}
                    />
                    <span className="font-medium">Mescola ordine</span>
                  </label>

                  <label className="flex flex-col gap-2 md:col-span-2">
                    <span className="font-medium">Secondi per domanda</span>
                    <input
                      type="number"
                      min={0}
                      value={secPerQ ?? 0}
                      onChange={(e) => setSecPerQ(+e.target.value || null)}
                      className="border rounded-md p-2 w-full dark:text-[#0f172a]"
                    />
                  </label>
                </div>
              </div>
            )}

            {activeId && (
              <div className="pt-4">
                <Button onClick={() => setActiveId("")}>Reset selezione</Button>
              </div>
            )}
          </div>
        </Card>
      )}

      {/* QUIZ */}
      {activeQuiz && (
        <Quiz
          quizId={activeQuiz.id}
          bank={(randomize
            ? shuffle(activeQuiz.questions)
            : [...activeQuiz.questions]
          ).slice(0, limit)}
          randomize={false}
          secondsPerQuestion={secPerQ}
          restart={() => setActiveId("")}
        />
      )}
    </main>
  );
};

export default App;
