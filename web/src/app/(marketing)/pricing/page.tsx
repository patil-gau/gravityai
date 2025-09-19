import { PricingCards } from '@/components/marketing/pricing-cards'

export const metadata = {
  title: 'Pricing - Gravity AI',
  description: 'Choose the perfect plan for your AI needs',
}

export default function PricingPage() {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Simple, transparent pricing
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Choose the plan that's right for you. Start free and scale as you grow.
          </p>
        </div>
        <PricingCards />
      </div>
    </div>
  )
}
