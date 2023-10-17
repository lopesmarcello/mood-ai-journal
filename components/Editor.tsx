'use client'

import { Analysis, JournalEntry } from '@prisma/client'
import { Textarea } from './ui/textarea'
import { useCallback, useEffect, useState } from 'react'
import { useDebouncer } from '@/hooks/useDebouncer'
import { updateEntry } from '@/utils/api'
import Emoji from './Emoji'
import { Separator } from './ui/separator'
import { useToast } from './ui/use-toast'
type Props = {
  entry: { analysis?: Analysis | null } & JournalEntry
}

const Editor = ({ entry }: Props) => {
  const [content, setContent] = useState(entry.content)
  const [analysis, setAnalysis] = useState(entry?.analysis)
  const { debouncedValue, setInputValue } = useDebouncer(1000)

  const { toast } = useToast()

  useEffect(() => {
    if (content !== entry.content) {
      setInputValue(content)
    }
  }, [content, setInputValue])

  const update = useCallback(async () => {
    toast({ description: "Saving..." })
    if (debouncedValue) {
      const updated = await updateEntry({
        id: entry.id,
        content: debouncedValue,
      })
      setAnalysis(updated?.analysis as Analysis)
    }
  }, [debouncedValue, entry.id, toast])

  useEffect(() => {
    update()
  }, [update])

  return (
    <>
      <div className="w-full col-span-2">
        <Textarea
          className="h-72 text-xl dark:bg-zinc-900/10 prose-xl border-zinc-50"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>

      {analysis && (
        <div className="pl-8">
          <ul>
            <li className={`text-xl mb-2`}>
              {analysis?.mood} <Emoji emoji={analysis.emoji} />
            </li>
            <li
              className={analysis?.negative ? 'text-red-400' : 'text-green-400'}
            >
              {analysis?.subject}
            </li>
            <Separator className={`my-4 bg-[${analysis.color}]`} />
            <li>{analysis?.summary}</li>
          </ul>
        </div>
      )}
    </>
  )
}

export default Editor
