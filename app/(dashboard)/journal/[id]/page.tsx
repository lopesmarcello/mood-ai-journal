import Editor from '@/components/Editor'
import { getUser } from '@/utils/auth'

const getEntry = async () => {
  const user = await getUser()
}
const EntryEditPage = ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <Editor entry={} />
    </div>
  )
}

export default EntryEditPage
