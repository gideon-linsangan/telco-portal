'use client'

interface ToggleProps {
  value: boolean
  onChange: (value: boolean) => void
  label?: string
  disabled?: boolean
}

export function Toggle({ value, onChange, label, disabled = false }: ToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={value}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange(!value)}
      className={`relative w-[34px] h-5 rounded-full transition-colors duration-150 flex-shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple focus-visible:ring-offset-2 ${
        value ? 'bg-brand-purple' : 'bg-brand-border'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
    >
      <span
        className={`absolute top-[3px] w-3.5 h-3.5 rounded-full bg-white transition-transform duration-150 ${
          value ? 'translate-x-[17px]' : 'translate-x-[3px]'
        }`}
      />
    </button>
  )
}
