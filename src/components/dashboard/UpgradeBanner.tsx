'use client'

import { useUsageContext } from '@/context/UsageContext'
import { Badge } from '@/components/ui/atoms/Badge'

export function UpgradeBanner() {
  const { percentUsed } = useUsageContext()

  if (percentUsed === null) return null

  return (
    <div className="bg-brand-ghost border border-brand-light rounded-xl shadow-card overflow-hidden h-full flex items-stretch">
      {/* Left accent bar */}
      <div className="w-[5px] bg-brand-signature flex-shrink-0" />

      {/* Content */}
      <div className="flex-1 p-7 flex flex-col justify-center gap-3.5">
        <div>
          <div className="flex items-center gap-2.5 mb-2.5">
            <Badge variant="warning">{percentUsed}% used</Badge>
            <span className="text-[12px] text-neutral-slate">
              You&apos;re approaching your data limit
            </span>
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

      {/* Right decorative SVG — hidden on mobile to give buttons room */}
      <div className="hidden md:flex w-[140px] flex-shrink-0 items-center justify-center overflow-hidden">
        <svg width="140" height="200" viewBox="0 0 140 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="110" cy="100" r="90" stroke="rgba(161,0,255,0.12)" strokeWidth="1" fill="none" />
          <circle cx="110" cy="100" r="60" stroke="rgba(161,0,255,0.18)" strokeWidth="1" fill="none" />
          <circle cx="110" cy="100" r="30" stroke="rgba(161,0,255,0.28)" strokeWidth="1.5" fill="none" />
          <circle cx="110" cy="100" r="8" fill="#A100FF" fillOpacity="0.4" />
          <circle cx="110" cy="100" r="4" fill="#A100FF" fillOpacity="0.9" />
        </svg>
      </div>
    </div>
  )
}
