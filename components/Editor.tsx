'use client'

import { JournalEntry } from '@prisma/client'
import { Textarea } from './ui/textarea'
import { useCallback, useEffect, useState } from 'react'
import { useDebouncer } from '@/hooks/useDebouncer'
import { updateEntry } from '@/utils/api'
type Props = {
  entry: JournalEntry
}

const Editor = ({ entry }: Props) => {
  const [content, setContent] = useState(entry.content)
  const [isSaving, setIsSaving] = useState(false)
  const { debouncedValue, setInputValue } = useDebouncer(1000)

  useEffect(() => {
    if (content !== entry.content) {
      setInputValue(content)
    }
  }, [content, setInputValue])

  const update = useCallback(async () => {
    if (debouncedValue && !isSaving) {
      setIsSaving(true)
      await updateEntry({ id: entry.id, content: debouncedValue })
      setIsSaving(false)
    }
  }, [debouncedValue, entry.id])

  useEffect(() => {
    update()
  }, [update])

  return (
    <div className="w-full">
      <Textarea
        className="h-72 text-xl dark:bg-zinc-900/10 prose-xl border-zinc-50"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      {isSaving && <div>...saving</div>}
    </div>
  )
}

export default Editor
