export const SparkleOverlay = () => (
    <div className="absolute inset-0 pointer-events-none z-10">
        <span className="block w-8 h-8 rounded-full bg-white/80 blur-md animate-twinkle1 absolute left-1/4 top-1/4"></span>
        <span className="block w-4 h-4 rounded-full bg-violet-200 blur animate-twinkle2 absolute right-1/4 bottom-2"></span>
        <span className="block w-6 h-6 rounded-full bg-fuchsia-100 blur-md animate-twinkle3 absolute left-1/2 top-1/2"></span>
        <span className="block w-3 h-3 rounded-full bg-violet-50 blur animate-twinkle4 absolute left-1/4 bottom-1/4"></span>
    </div>
);
