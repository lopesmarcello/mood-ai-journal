import { Button } from '@/components/ui/button'
import { auth } from '@clerk/nextjs'
import Link from 'next/link'

export default async function Home() {
  const { userId } = await auth()
  let href = userId ? '/journal' : '/new-user'

  return (
    <div className="w-screen h-screen bg-zinc-100 dark:bg-zinc-900 flex justify-center items-center">
      <div className="w-full max-w-[800px] mx-auto">
        <h1 className="text-6xl mb-8 text-zinc-700 dark:text-zinc-300">
          <span className="text-indigo-400 font-bold">AI Mood Journal.</span>{' '}
          <br /> Track how your days feel.
        </h1>
        <p className="text-2xl text-zinc-400 dark:text-white/80 mb-16">
          Be honest <span className="text-red-400 font-bold">{'<3'}</span>
        </p>
        <div>
          <Link href={href}>
            <Button className="bg-indigo-400 px-4 py-2 rounded-lg text-xl text-indigo-100 hover:text-indigo-50 hover:bg-indigo-500 transition-all">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
