'use client'
import { Analysis, JournalEntry } from '@prisma/client'
import EntryCard from './EntryCard'

type Props = {
  entries: (JournalEntry & { analysis: Analysis | null })[]
}

const JournalEntryList = ({ entries }: Props) => {
  return entries.map((entry) => <EntryCard key={entry.id} entry={entry} />)
}

export default JournalEntryList
