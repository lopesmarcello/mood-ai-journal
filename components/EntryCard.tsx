import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from './ui/card'
import Emoji from './Emoji'
import { Analysis, JournalEntry } from '@prisma/client'
import { Pencil, Trash2 } from 'lucide-react'
import ButtonTooltip from './ButtonTooltip'
import Link from 'next/link'
import { deleteEntry } from '@/utils/api'

type EntryCardProps = {
  entry: { analysis: Analysis | null } & JournalEntry
}

const EntryCard = ({ entry }: EntryCardProps) => {
  const date = new Date(entry.createdAt).toLocaleDateString()

  const handleContent = (content: string) => {
    const previewLengthInChars = 500
    return content.length >= previewLengthInChars
      ? content.slice(0, previewLengthInChars) + '...'
      : content
  }

  return (
    <Card className="dark:bg-zinc-800 dark:border-zinc-600">
      <CardHeader className="flex-row justify-between items-center">
        <CardDescription className="inline">{date}</CardDescription>
        {entry?.analysis?.mood && (
          <CardDescription className="inline">
            {entry.analysis.mood.toLocaleLowerCase()}
          </CardDescription>
        )}
        {entry?.analysis?.emoji && (
          <CardDescription className="inline">
            <Emoji emoji={entry.analysis.emoji} />
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="prose lg:prose-xl dark:text-zinc-100">
        <p>{handleContent(entry.content)}</p>
      </CardContent>
      <CardFooter>
        <ButtonTooltip tooltip="Edit">
          <Link href={`/journal/${entry.id}`}>
            <Pencil />
          </Link>
        </ButtonTooltip>
        <ButtonTooltip tooltip="Delete">
          <Trash2 />
        </ButtonTooltip>
      </CardFooter>
    </Card>
  )
}

export default EntryCard
