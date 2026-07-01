'use client'

type InputProps = {
  type: 'text' | 'email' | 'password'
  placeholder?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  error?: boolean
  suffix?: React.ReactNode
}

export function Input({ type, placeholder, value, onChange, error = false, suffix }: InputProps) {
  return (
    <div className="relative">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full h-11 border rounded-lg px-4 text-[15px] text-neutral-ink bg-white outline-none placeholder:text-neutral-slate/60 transition-colors ${
          error
            ? 'border-semantic-error focus:ring-2 focus:ring-semantic-error/15'
            : 'border-neutral-border focus:border-brand-signature focus:ring-2 focus:ring-brand-signature/15'
        }${suffix ? ' pr-11' : ''}`}
      />
      {suffix && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          {suffix}
        </div>
      )}
    </div>
  )
}