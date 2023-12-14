import { cn } from "@/lib/utils";

interface ISidebar {
  children: React.ReactNode
  className: string;
}

export default function Sidebar({ children, className }: ISidebar) {
  return (
    <aside className={cn
    ("bg-zinc-200 text-zinc-800 dark:text-zinc-200 dark:bg-zinc-800 h-screen w-[20vw] rounded-r-lg flex flex-col items-center", 
    className
    )
    }>
      {children}
    </aside>
  )
}