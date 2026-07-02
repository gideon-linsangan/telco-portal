export const dynamic = 'force-dynamic'

import { SiteHeader } from '@/components/SiteHeader'
import { HeroSection } from '@/components/HeroSection'
import { TrustBar } from '@/components/TrustBar'
import { FeatureBlocks } from '@/components/FeatureBlocks'
import { PlansSection } from '@/components/PlansSection'
import { PromoBanner } from '@/components/PromoBanner'
import { BlogSection } from '@/components/BlogSection'
import { SiteFooter } from '@/components/SiteFooter'
import {
  getHero,
  getStats,
  getFeatures,
  getPlans,
  getPromoBanner,
  getBlogPosts,
} from '@/lib/contentful'
import type { Plan } from '@/types/plans'

export default async function HomePage() {
  const [hero, stats, features, plans, banner, posts] = await Promise.all([
    getHero(),
    getStats(),
    getFeatures(),
    getPlans(),
    getPromoBanner(),
    getBlogPosts(),
  ])

  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection data={hero} />
        <TrustBar data={stats} />
        <FeatureBlocks data={features} />
        <PlansSection data={plans as Plan[]} />
        <PromoBanner data={banner} />
        <BlogSection data={posts} />
      </main>
      <SiteFooter />
    </>
  )
}
