'use client'

import { Label } from '@/components/ui/atoms/Label'
import { Input } from '@/components/ui/atoms/Input'

type FormFieldProps = {
  id: string
  label: string
  type: 'text' | 'email' | 'password'
  placeholder?: string
  error?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function FormField({ id, label, type, placeholder, error, value, onChange }: FormFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        error={!!error}
      />
      {error && <span className="text-semantic-error text-xs mt-1">{error}</span>}
    </div>
  )
}
