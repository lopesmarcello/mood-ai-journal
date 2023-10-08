import Editor from '@/components/Editor'
import Emoji from '@/components/Emoji'
import { Separator } from '@/components/ui/separator'
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
  console.log(entry)
  return (
    <div className="w-full h-full grid grid-cols-3">
      <div className="col-span-2 flex flex-col gap-4">
        {entry && <Editor entry={entry} />}
        <Link
          href="/journal"
          className="underline text-indigo-300 cursor-pointer hover:text-indigo-500"
        >
          Back
        </Link>
      </div>
      {entry?.analysis && (
        <div className="pl-8">
          <ul>
            <li className={`text-xl mb-2`}>
              {entry?.analysis?.mood} <Emoji emoji={entry.analysis.emoji} />
            </li>
            <li
              className={
                entry.analysis?.negative ? 'text-red-400' : 'text-green-400'
              }
            >
              {entry?.analysis?.subject}
            </li>
            <Separator className={`my-4 bg-[${entry.analysis.color}]`} />
            <li>{entry?.analysis?.summary}</li>
          </ul>
        </div>
      )}
    </div>
  )
}

export default EntryEditPage
