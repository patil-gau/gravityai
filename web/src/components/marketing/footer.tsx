import Link from 'next/link'

export function MarketingFooter() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <span className="text-xl font-bold text-brand-600">Gravity AI</span>
              <p className="mt-4 text-sm text-gray-600 max-w-md">
                Production-ready AI platform for modern businesses. 
                Streamline your workflow with intelligent automation.
              </p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-900">Product</h3>
              <ul className="mt-4 space-y-2">
                <li><Link href="/pricing" className="text-sm text-gray-600 hover:text-gray-900">Pricing</Link></li>
                <li><Link href="/app/dashboard" className="text-sm text-gray-600 hover:text-gray-900">Dashboard</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-900">Legal</h3>
              <ul className="mt-4 space-y-2">
                <li><Link href="/privacy" className="text-sm text-gray-600 hover:text-gray-900">Privacy</Link></li>
                <li><Link href="/terms" className="text-sm text-gray-600 hover:text-gray-900">Terms</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              © {new Date().getFullYear()} Gravity AI. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
