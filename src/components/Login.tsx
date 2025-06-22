import { useState } from "react";

interface Props {
  onLogin: () => void;
}

export const Login = ({ onLogin }: Props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (username === "admin" && password === "1234") {
      localStorage.setItem("loggedIn", "true");
      onLogin();
    } else {
      setError("Credenziali non valide");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 max-w-sm mx-auto p-6 bg-white dark:bg-zinc-900 rounded shadow"
    >
      <h2 className="text-xl font-bold text-center">Login</h2>

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full p-2 rounded border dark:bg-zinc-800 dark:text-white"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 rounded border dark:bg-zinc-800 dark:text-white"
      />

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        className="w-full bg-primary text-white py-2 rounded hover:bg-primary/90 transition"
      >
        Accedi
      </button>
    </form>
  );
};
