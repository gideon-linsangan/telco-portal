import { Badge } from '@/components/ui/atoms/Badge'

interface UpgradeBannerProps {
  percentUsed: number
}

export function UpgradeBanner({ percentUsed }: UpgradeBannerProps) {
  return (
    <div className="bg-brand-deep rounded-xl p-6 relative overflow-hidden h-full">
      {/* Decorative rings */}
      <svg
        className="absolute top-0 right-0 opacity-10"
        width="200"
        height="200"
        viewBox="0 0 200 200"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="160" cy="40" r="80" stroke="#A100FF" strokeWidth="1.5" />
        <circle cx="160" cy="40" r="120" stroke="#A100FF" strokeWidth="1" />
        <circle cx="160" cy="40" r="160" stroke="#A100FF" strokeWidth="0.5" />
      </svg>

      <Badge variant="warning" dot>
        {percentUsed}% used
      </Badge>
      <h2 className="text-[20px] font-bold text-white leading-snug mt-3 mb-2">
        You&apos;ve used {percentUsed}% of your data. Upgrade to Pro for unlimited.
      </h2>
      <p className="text-[14px] text-brand-light/80 mb-5">
        Pro gives you unlimited data, Ultra 5G speeds, and 24/7 support — from $99/mo with no lock-in.
      </p>
      <div className="flex items-center gap-4">
        <button className="bg-brand-signature hover:bg-brand-mid text-white font-semibold px-6 h-11 rounded-lg transition-colors text-[14px]">
          Upgrade now
        </button>
        <a
          href="#"
          className="text-[13px] text-brand-light hover:text-white font-medium transition-colors"
        >
          Compare plans →
        </a>
      </div>
    </div>
  )
}
