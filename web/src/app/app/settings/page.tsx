import { SettingsTabs, ProfileSettings, PreferencesSettings, SecuritySettings, BillingSettings } from '@/components/app/stubs'

export const metadata = {
  title: 'Settings - Gravity AI',
  description: 'Manage your account and preferences',
}

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="mt-2 text-gray-600">
          Manage your account settings, preferences, and integrations.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <SettingsTabs />
        <div className="lg:col-span-3 space-y-8">
          <ProfileSettings />
          <PreferencesSettings />
          <SecuritySettings />
          <BillingSettings />
        </div>
      </div>
    </div>
  )
}
