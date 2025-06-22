import { useState } from "react";

export const PromptInfo = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="text-left max-w-xl mx-auto w-full">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between bg-surface-light dark:bg-surface-dark text-sm font-semibold px-4 py-3 rounded shadow hover:bg-gray-100 dark:hover:bg-zinc-700 transition"
      >
        <span>📋 Prompt per generare domande JSON</span>
        <span>{open ? "▲" : "▼"}</span>
      </button>

      {open && (
        <pre className="mt-4 p-4 rounded bg-gray-100 dark:bg-zinc-800 text-sm whitespace-pre-wrap break-words overflow-x-auto">
          {`Genera N domande a risposta multipla (minimo 300).
Restituiscimi solo un array JSON, senza altro testo, con il seguente schema per ogni oggetto:

{
  "id": <numero progressivo>,
  "question": "<testo della domanda>",
  "options": [
    { "label": "A", "text": "<risposta A>" },
    { "label": "B", "text": "<risposta B>" },
    { "label": "C", "text": "<risposta C>" },
    { "label": "D", "text": "<risposta D>" }
  ],
  "correct": "<lettera corretta: A|B|C|D>"
}

Usa tematiche di sostenibilità, SDG, ESG, impact investing.
Le opzioni devono essere plausibili tra loro, solo una corretta.
Nessun carattere prima di [ né dopo ] (deve essere JSON valido).`}
        </pre>
      )}
    </div>
  );
};
