export default function Sidebar({ children }: { children: React.ReactNode }) {
  return (
    <div className='min-w-64 max-h-[calc(100vh-var(--navbar-height))] p-4'>
      <aside className='w-full h-full p-6 rounded-xl border border-gray-100 dark:bg-gray-700/20 shadow-lg shadow-gray-400/30 dark:shadow-white/20 flex flex-col gap-y-3'>
        {children}
      </aside>
    </div>
  );
}
