export const Card = ({ children }: { children: React.ReactNode }) => (
  <div className="w-full max-w-3xl rounded-3xl bg-surface-light dark:bg-surface-dark backdrop-blur-sm shadow-glass px-10 py-12 space-y-8">
    {children}
  </div>
);
