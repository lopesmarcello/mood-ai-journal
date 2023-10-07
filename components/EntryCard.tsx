import { Analysis, JournalEntry } from '@prisma/client'
import { Card, CardContent, CardDescription, CardHeader } from './ui/card'
import Emoji from './Emoji'

type EntryCardProps = {
  entry: JournalEntry & { analysys?: Analysis }
}
const EntryCard = ({ entry }: EntryCardProps) => {
  const date = new Date(entry.createdAt).toLocaleDateString()

  return (
    <Card className="dark:bg-zinc-800 dark:border-zinc-600">
      <CardHeader>
        <CardDescription className="flex justify-between">
          <p>{date}</p>
          <p>{entry?.analysys?.mood ?? 'mood'}</p>
          {entry?.analysys?.emoji ? (
            <Emoji emoji={entry.analysys.emoji} />
          ) : (
            <Emoji emoji="😠" />
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="prose lg:prose-xl dark:text-zinc-100">
        <p>{entry.content}</p>
      </CardContent>
    </Card>
  )
}

export default EntryCard
