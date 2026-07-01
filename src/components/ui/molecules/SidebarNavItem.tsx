import NextLink from 'next/link'

type SidebarNavItemProps = {
  href: string
  label: string
  icon: React.ReactNode
  active?: boolean
}

export function SidebarNavItem({ href, label, icon, active = false }: SidebarNavItemProps) {
  return (
    <NextLink
      href={href}
      className={`flex items-center gap-2.5 px-4 py-2.5 rounded-lg text-[14px] font-medium transition-all ${
        active
          ? 'bg-white/12 text-white'
          : 'text-white/75 hover:bg-white/8 hover:text-white'
      }`}
    >
      {icon}
      {label}
    </NextLink>
  )
}