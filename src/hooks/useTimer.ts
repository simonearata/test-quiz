import { useEffect, useState } from "react";

export const useTimer = (deadline: number | null) => {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    if (deadline === null) return;
    const id = setInterval(() => setNow(Date.now()), 500);
    return () => clearInterval(id);
  }, [deadline]);

  if (deadline === null) return { secondsLeft: null, expired: false };
  const diff = Math.max(0, Math.floor((deadline - now) / 1000));
  return { secondsLeft: diff, expired: diff === 0 };
};
