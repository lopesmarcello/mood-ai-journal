'use client'

import { Analysis } from '@prisma/client'
import {
  ResponsiveContainer,
  Line,
  XAxis,
  LineChart,
  Tooltip,
  CartesianGrid,
  YAxis,
  Legend,
} from 'recharts'

const HistoryChart = ({ data }: { data: Analysis[] }) => {
  const formattedData = data.map((item) => ({
    ...item,
    createdAt: new Date(item.createdAt).toLocaleDateString(),
  }))

  return (
    <ResponsiveContainer width={'100%'} height={'80%'}>
      <LineChart
        data={formattedData}
        margin={{ top: 10, right: 30, left: 20, bottom: 10 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="createdAt" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="sentimentScore"
          stroke="#6366f1"
          strokeWidth={2}
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default HistoryChart
