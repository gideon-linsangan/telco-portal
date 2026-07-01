import { Label } from '@/components/ui/atoms/Label'
import { Input } from '@/components/ui/atoms/Input'
import { Stack } from '@/components/layout/Stack'

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
    <Stack gap="gap-1.5">
      <Label htmlFor={id}>{label}</Label>
      <Input type={type} placeholder={placeholder} value={value} onChange={onChange} error={!!error} />
      {error && <span className="text-semantic-error text-xs mt-1">{error}</span>}
    </Stack>
  )
}