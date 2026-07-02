'use client'

type InputProps = {
  type: 'text' | 'email' | 'password'
  id?: string
  name?: string
  placeholder?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  error?: boolean
  suffix?: React.ReactNode
}

export function Input({ type, id, name, placeholder, value, onChange, error, suffix }: InputProps) {
  const base = 'w-full h-11 border rounded-lg px-4 text-[15px] text-neutral-ink bg-white outline-none transition-all placeholder:text-neutral-slate/60'
  const border = error
    ? 'border-semantic-error focus:ring-2 focus:ring-semantic-error/15'
    : 'border-neutral-border focus:border-brand-signature focus:ring-2 focus:ring-brand-signature/15'

  if (suffix) {
    return (
      <div className="relative">
        <input
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`${base} ${border} pr-11`}
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          {suffix}
        </div>
      </div>
    )
  }

  return (
    <input
      id={id}
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`${base} ${border}`}
    />
  )
}
