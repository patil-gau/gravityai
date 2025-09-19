import { DocumentGrid, CreateDocumentButton, DocumentFilters } from '@/components/app/stubs'

export const metadata = {
  title: 'Documents - Gravity AI',
  description: 'AI-enhanced document management and collaboration',
}

export default function DocumentsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Documents</h1>
          <p className="mt-2 text-gray-600">
            Create, edit, and collaborate on documents with AI assistance and smart organization.
          </p>
        </div>
        <CreateDocumentButton />
      </div>

      <DocumentFilters />
      <DocumentGrid />
    </div>
  )
}
