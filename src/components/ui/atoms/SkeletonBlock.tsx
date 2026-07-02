type SkeletonBlockProps = {
  width?: string
  height?: string
  rounded?: string
}

export function SkeletonBlock({ width = 'w-full', height = 'h-4', rounded = 'rounded' }: SkeletonBlockProps) {
  return <div className={`animate-pulse bg-neutral-border ${width} ${height} ${rounded}`} />
}
