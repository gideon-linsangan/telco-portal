interface CardProps {
  children: React.ReactNode
  className?: string
}

export function Card({ children, className = '' }: CardProps) {
  return (
    <div
      className={`bg-white border border-brand-border rounded-xl shadow-[0_1px_4px_rgba(70,0,115,0.06)] ${className}`}
    >
      {children}
    </div>
  )
}
