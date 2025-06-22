interface Props {
  value: number; // tra 0 e 1
}

export const ProgressBar = ({ value }: Props) => (
  <div className="w-full h-4 bg-gray-300/40 dark:bg-gray-700/60 rounded-full overflow-hidden">
    <div
      className="h-full bg-gradient-to-r from-primary to-emerald-400 transition-all duration-300"
      style={{ width: `${Math.floor(value * 100)}%` }}
    />
  </div>
);
