
import { cn } from "@/lib/utils"

interface PageContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function PageContainer({ children, className, ...props }: PageContainerProps) {
  return (
    <div 
      className={cn(
        "min-h-screen bg-gradient-to-br from-gray-50 via-gray-50 to-gray-100 animate-gradient-slow",
        className
      )} 
      {...props}
    >
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      <div className="relative">{children}</div>
    </div>
  )
}
