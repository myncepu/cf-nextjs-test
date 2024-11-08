export function Background() {
  return (
    <div className="fixed inset-0 -z-10 h-full w-full">
      {/* 基础背景色 */}
      <div className="absolute inset-0 bg-white dark:bg-zinc-950" />
      
      {/* 渐变网格 */}
      <div className="absolute inset-0 bg-grid opacity-[0.02] dark:opacity-[0.05]" />
      
      {/* 主渐变 */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-50/50 via-sky-50/50 to-cyan-50/50 dark:from-indigo-950/50 dark:via-sky-950/50 dark:to-cyan-950/50 animate-gradient" />
      </div>
      
      {/* 柔和光晕 */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[1000px] w-full">
        <div className="absolute inset-0 rotate-[-35deg] bg-gradient-to-r from-transparent via-indigo-500/5 to-transparent dark:via-indigo-500/10" />
      </div>
    </div>
  );
} 