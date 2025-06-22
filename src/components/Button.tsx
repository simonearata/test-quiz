interface BtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
}

export const Button = ({
  variant = "primary",
  className = "",
  ...rest
}: BtnProps) => {
  const base =
    "rounded-full px-8 py-3 font-semibold transition active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2";
  const style: Record<string, string> = {
    primary:
      "bg-primary dark:text-white hover:bg-primary-soft focus:ring-primary text-[#0f172a]",
    secondary:
      "bg-white/80 dark:bg-gray-700/40 border hover:bg-white focus:ring-gray-400",
    ghost:
      "text-primary hover:bg-primary/10 dark:hover:bg-primary/20 focus:ring-primary",
  };
  return (
    <button className={`${base} ${style[variant]} ${className}`} {...rest} />
  );
};
