import { JournalList, CreateJournalButton } from '@/components/app/stubs'

export const metadata = {
  title: 'Journals - Gravity AI',
  description: 'Your personal AI-powered journals',
}

export default function JournalsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Journals</h1>
          <p className="mt-2 text-gray-600">
            Capture your thoughts and let AI help you reflect and grow.
          </p>
        </div>
        <CreateJournalButton />
      </div>

      <JournalList />
    </div>
  )
}
