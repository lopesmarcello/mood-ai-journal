import HistoryChart from '@/components/HistoryChart'
import { getUser } from '@/utils/auth'
import { prisma } from '@/utils/db'

const getData = async () => {
  const user = await getUser()
  const analyses = await prisma.analysis.findMany({
    where: {
      userId: user.id,
    },
  })

  const sum = analyses.reduce((acc, current) => acc + current.sentimentScore, 0)
  const averageScore = sum / analyses.length

  return { analyses, averageScore }
}

const History = async () => {
  const { analyses, averageScore } = await getData()

  return (
    <div className="h-full w-full">
      {averageScore && <h2>Average: {averageScore}</h2>}
      <div className="h-screen w-full">
        <HistoryChart data={analyses} />
      </div>
    </div>
  )
}

export default History
