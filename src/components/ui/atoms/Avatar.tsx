type AvatarProps = {
  initials: string
  size?: 'sm' | 'md'
}

const sizeMap = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-9 h-9 text-sm',
}

export function Avatar({ initials, size = 'md' }: AvatarProps) {
  return (
    <div className={`${sizeMap[size]} rounded-full bg-brand-signature text-white font-bold flex items-center justify-center flex-shrink-0`}>
      {initials.slice(0, 2).toUpperCase()}
    </div>
  )
}
