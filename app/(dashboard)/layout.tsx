import ThemeModeToggle from '@/components/ThemeModeToggle'
import { Separator } from '@/components/ui/separator'
import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import { ReactNode } from 'react'

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex min-h-screen min-w-screen bg-zinc-50 dark:bg-zinc-800">
      <aside className="hidden md:flex flex-col gap-2 p-4 w-[200px] min-h-screen h-full border-r  border-zinc-900/10 dark:border-zinc-900/30">
        <h2>Mood AI Journal</h2>
        <Separator />
        <Link href="/">Home</Link>
        <Link href="/journal">Journals</Link>
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
