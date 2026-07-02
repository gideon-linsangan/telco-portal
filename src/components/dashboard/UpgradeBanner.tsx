import { Badge } from '@/components/ui/atoms/Badge'

interface UpgradeBannerProps {
  percentUsed: number
}

export function UpgradeBanner({ percentUsed }: UpgradeBannerProps) {
  return (
    <div className="bg-brand-ghost border border-brand-light rounded-xl shadow-card overflow-hidden h-full flex items-stretch">
      {/* Left accent bar */}
      <div className="w-[5px] bg-brand-signature rounded-full flex-shrink-0 self-stretch" />
      <div className="flex-1 p-7 flex flex-col justify-center gap-3.5">
        <div>
          <div className="flex items-center gap-2.5 mb-2.5">
            <Badge variant="warning" dot>
              {percentUsed}% used
            </Badge>
            <p className="text-[12px] font-medium text-neutral-slate uppercase tracking-wider">
              You&apos;re approaching your data limit
            </p>
          </div>
          <h3 className="text-[18px] font-semibold text-neutral-ink leading-snug tracking-[-0.01em]">
            You&apos;ve used {percentUsed}% of your data.<br />Upgrade to Pro for unlimited.
          </h3>
        </div>
        <p className="text-[14px] text-neutral-slate leading-relaxed">
          Pro gives you unlimited data, Ultra 5G speeds, and 24/7 support — from $99/mo with no lock-in.
        </p>
        <div className="flex items-center gap-4">
          <button className="bg-brand-signature hover:bg-brand-mid text-white font-semibold px-5 h-[38px] rounded-lg transition-colors text-[14px]">
            Upgrade now
          </button>
          <a
            href="#"
            className="text-[13px] text-neutral-slate hover:text-neutral-ink font-medium transition-colors"
          >
            Compare plans →
          </a>
        </div>
      </div>
    </div>
  )
}
