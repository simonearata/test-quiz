import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export const ThemeToggle = () => {
  const [dark, setDark] = useState(
    () => localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", dark);
    root.classList.toggle("light", !dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  const Icon = dark ? Sun : Moon;

  return (
    <button
      onClick={() => setDark(!dark)}
      className="p-3 rounded-full bg-surface-light dark:bg-surface-dark backdrop-blur-sm shadow-lg hover:scale-105 transition"
      aria-label="Toggle tema"
    >
      <Icon size={20} />
    </button>
  );
};
