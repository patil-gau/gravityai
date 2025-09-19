import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const features = [
  {
    title: 'Smart Journals',
    description: 'AI-powered journaling with insights and reflection prompts.',
    icon: '📝',
  },
  {
    title: 'Intelligent Tasks',
    description: 'Task management with priority suggestions and deadline optimization.',
    icon: '✅',
  },
  {
    title: 'Smart Calendar',
    description: 'AI scheduling that prevents conflicts and optimizes your time.',
    icon: '📅',
  },
  {
    title: 'Document AI',
    description: 'Collaborative documents with AI writing assistance and summarization.',
    icon: '📄',
  },
]

export function FeaturesSection() {
  return (
    <div className="bg-gray-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need to be productive
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Powerful tools that work together to amplify your productivity with AI.
          </p>
        </div>
        
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <Card key={feature.title} className="text-center">
              <CardHeader>
                <div className="text-4xl mb-4">{feature.icon}</div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
