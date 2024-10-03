import { twMerge } from "tailwind-merge";

export default function Sidebar({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={twMerge(
        "min-w-80 h-fit max-h-[calc(100vh-var(--navbar-height))]",
        className
      )}
    >
      <aside className='w-full h-full py-6 rounded-medium border border-gray-100 dark:bg-gray-700/20 shadow-lg shadow-gray-400/30 dark:shadow-white/20 flex flex-col gap-y-3'>
        {children}
      </aside>
    </div>
  );
}
