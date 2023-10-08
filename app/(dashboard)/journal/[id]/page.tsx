import Editor from '@/components/Editor'
import { getUser } from '@/utils/auth'
import { prisma } from '@/utils/db'
import Link from 'next/link'

const getEntry = async (id: string) => {
  const user = await getUser()
  const entry = await prisma.journalEntry.findUnique({
    where: {
      userId_id: {
        userId: user.id,
        id,
      },
    },
    include: {
      analysis: true,
    },
  })

  return entry
}

const EntryEditPage = async ({ params }: { params: { id: string } }) => {
  const entry = await getEntry(params.id)
  return (
    <>
      <div className="w-full h-full grid grid-cols-3 mb-4">
        {entry && <Editor entry={entry} />}
      </div>
      <Link
        href="/journal"
        className="underline text-indigo-400 dark:text-indigo-300 cursor-pointer hover:text-indigo-500"
      >
        Back
      </Link>
    </>
  )
}

export default EntryEditPage
