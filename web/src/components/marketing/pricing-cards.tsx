import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

const plans = [
  {
    name: 'Free',
    price: '$0',
    description: 'Perfect for getting started',
    features: ['5 AI-powered journals', '10 smart tasks', 'Basic calendar', 'Community support'],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Pro',
    price: '$29',
    description: 'For professionals and teams',
    features: ['Unlimited journals', 'Unlimited tasks', 'Advanced calendar', 'Document collaboration', 'Priority support'],
    cta: 'Start Free Trial',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For large organizations',
    features: ['Everything in Pro', 'Custom integrations', 'Advanced analytics', 'Dedicated support', 'SLA guarantee'],
    cta: 'Contact Sales',
    popular: false,
  },
]

export function PricingCards() {
  return (
    <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {plans.map((plan) => (
        <Card key={plan.name} className={`relative ${plan.popular ? 'border-brand-500 shadow-lg' : ''}`}>
          {plan.popular && (
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="bg-brand-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                Most Popular
              </span>
            </div>
          )}
          
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">{plan.name}</CardTitle>
            <div className="mt-4">
              <span className="text-4xl font-bold">{plan.price}</span>
              {plan.price !== 'Custom' && <span className="text-gray-600">/month</span>}
            </div>
            <CardDescription>{plan.description}</CardDescription>
          </CardHeader>
          
          <CardContent>
            <ul className="space-y-3">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center">
                  <span className="text-brand-500 mr-3">✓</span>
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          
          <CardFooter>
            <Button 
              className="w-full" 
              variant={plan.popular ? 'primary' : 'outline'}
            >
              {plan.cta}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
