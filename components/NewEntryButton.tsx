'use client'

import { createNewEntry } from '@/utils/api'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'

const NewEntryButton = () => {
  const router = useRouter()

  const handleOnClick = async () => {
    const data = await createNewEntry()
    router.push(`/journal/${data.entry.id}`)
  }

  return (
    <Button
      className="bg-indigo-100 dark:bg-indigo-300 hover:bg-indigo-400 text-indigo-400 dark:text-zinc-900 hover:text-indigo-50 transition-all"
      onClick={handleOnClick}
    >
      New Entry
    </Button>
  )
}

export default NewEntryButton
