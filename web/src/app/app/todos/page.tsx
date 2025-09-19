import { TodoList, CreateTodoButton, TodoFilters } from '@/components/app/stubs'

export const metadata = {
  title: 'Todos - Gravity AI',
  description: 'AI-enhanced task management',
}

export default function TodosPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Todos</h1>
          <p className="mt-2 text-gray-600">
            Intelligent task management with AI-powered insights and suggestions.
          </p>
        </div>
        <CreateTodoButton />
      </div>

      <TodoFilters />
      <TodoList />
    </div>
  )
}
