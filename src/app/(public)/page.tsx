import type { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { HeroSection } from '@/components/homepage/HeroSection'
import { FeatureGrid } from '@/components/homepage/FeatureGrid'
import { StatBar } from '@/components/homepage/StatBar'
import { PricingSection } from '@/components/homepage/PricingSection'
import { PromoBanner } from '@/components/homepage/PromoBanner'
import { BlogSection } from '@/components/homepage/BlogSection'
import {
  getHomepageHero,
  getFeatureBlocks,
  getStatBlocks,
  getPricingPlans,
  getPromoBanner,
  getRecentBlogPosts,
  getSeoMeta,
} from '@/lib/contentful'

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoMeta('homepage')
  if (!seo) return {}
  return {
    title: seo.title,
    description: seo.description,
    openGraph: seo.ogImage ? { images: [seo.ogImage.url] } : undefined,
  }
}

export default async function HomePage() {
  const [hero, features, stats, plans, banner, posts] = await Promise.all([
    getHomepageHero(),
    getFeatureBlocks(),
    getStatBlocks(),
    getPricingPlans(),
    getPromoBanner(),
    getRecentBlogPosts(3),
  ])

  return (
    <>
      <Header />
      <main>
        {hero && <HeroSection hero={hero} />}
        {stats.length > 0 && <StatBar stats={stats} />}
        {features.length > 0 && <FeatureGrid features={features} />}
        {plans.length > 0 && <PricingSection plans={plans} />}
        {banner && <PromoBanner banner={banner} />}
        {posts.length > 0 && <BlogSection posts={posts} />}
      </main>
      <Footer />
    </>
  )
}
