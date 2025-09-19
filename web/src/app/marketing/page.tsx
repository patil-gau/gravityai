import { HeroSection } from '@/components/marketing/hero-section'
import { FeaturesSection } from '@/components/marketing/features-section'
import { CtaSection } from '@/components/marketing/cta-section'

export default function HomePage() {
  return (
    <div className="space-y-0">
      <HeroSection />
      <FeaturesSection />
      <CtaSection />
    </div>
  )
}
