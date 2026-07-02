'use client'

type ToggleProps = {
  checked: boolean
  onChange: (checked: boolean) => void
  'aria-label': string
}

export function Toggle({ checked, onChange, 'aria-label': ariaLabel }: ToggleProps) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel}
      onClick={() => onChange(!checked)}
      className={`relative w-[34px] h-5 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-brand-signature/30 ${checked ? 'bg-brand-signature' : 'bg-neutral-border'}`}
    >
      <span
        className={`absolute top-[3px] w-3.5 h-3.5 rounded-full bg-white transition-all ${checked ? 'left-[17px]' : 'left-[3px]'}`}
      />
    </button>
  )
}
