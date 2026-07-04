import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: string;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const normalized = status.toLowerCase();
  
  const colors: Record<string, string> = {
    // Role colors
    admin: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400 border-purple-200 dark:border-purple-800",
    instructor: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800",
    student: "bg-slate-100 text-slate-800 dark:bg-slate-900/30 dark:text-slate-400 border-slate-200 dark:border-slate-800",
    
    // Status colors
    active: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800",
    suspended: "bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-400 border-rose-200 dark:border-rose-800",
    
    // Instructor status colors
    pending: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800",
    approved: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800",
    rejected: "bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-400 border-rose-200 dark:border-rose-800",
    none: "bg-slate-100 text-slate-800 dark:bg-slate-900/30 dark:text-slate-400 border-slate-200 dark:border-slate-800",
    
    // Payment status colors
    paid: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800",
    failed: "bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-400 border-rose-200 dark:border-rose-800",
  };

  const colorStyle = colors[normalized] || "bg-slate-100 text-slate-800 border-slate-200";

  return (
    <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border transition-all duration-200 capitalize", colorStyle, className)}>
      {status}
    </span>
  );
}
