import ThemeModeToggle from '@/components/ThemeModeToggle'
import { UserButton } from '@clerk/nextjs'
import { ReactNode } from 'react'

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex h-screen w-screen bg-zinc-50 dark:bg-zinc-800">
      <aside className="w-[200px] h-full border-r  border-zinc-900/10 dark:border-zinc-900/30">
        Mood
      </aside>
      <div className="w-full">
        <header className="h-[60px] border-b border-zinc-900/10 dark:border-zinc-900/30">
          <div className="h-full w-full px-6 flex items-center justify-end gap-4">
            <ThemeModeToggle />
            <UserButton />
          </div>
        </header>
        <div className="p-10">{children}</div>
      </div>
    </div>
  )
}

export default DashboardLayout
