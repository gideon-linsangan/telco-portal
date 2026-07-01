type ClusterProps = {
  gap?: string
  align?: string
  children: React.ReactNode
}

export function Cluster({ gap = 'gap-4', align = 'items-start', children }: ClusterProps) {
  return <div className={`flex flex-wrap ${gap} ${align}`}>{children}</div>
}