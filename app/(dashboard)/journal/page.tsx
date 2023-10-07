import EntryCard from '@/components/EntryCard'
import NewEntryButton from '@/components/NewEntryButton'
import { getUser } from '@/utils/auth'
import { prisma } from '@/utils/db'

const getEntries = async () => {
  const user = await getUser()
  const entries = await prisma.journalEntry.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return entries
}

const JournalPage = async () => {
  const entries = await getEntries()

  return (
    <>
      <div className="flex gap-16">
        <h2 className="text-3xl mb-8 text-indigo-500 font-bold">Journal</h2>
        <NewEntryButton />
      </div>
      {entries.length === 0 && (
        <p>
          Create your first journal entry by clicking the{' '}
          <strong>New Entry</strong>
          button above.
        </p>
      )}
      <div className="grid grid-cols-3 gap-4">
        {entries.map((entry) => (
          <EntryCard key={entry.id} entry={entry} />
        ))}
      </div>
    </>
  )
}
export default JournalPage
