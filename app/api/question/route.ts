import { qa } from '@/utils/ai'
import { getUser } from '@/utils/auth'
import { prisma } from '@/utils/db'
import { NextRequest, NextResponse } from 'next/server'

export const POST = async (req: NextRequest) => {
  const { question } = await req.json()
  const user = await getUser()

  if (!user) {
    return NextResponse.json({
      status: 404,
      message:
        "Didn't find a user with this clerk ID on internal database. Please check if the app database is in sync with clerk",
    })
  }

  const entries = await prisma.journalEntry.findMany({
    where: {
      userId: user.id,
    },
    select: {
      id: true,
      content: true,
      createdAt: true,
    },
  })

  const answer = await qa(question, entries)

  if (!answer) {
    return NextResponse.json({
      status: 400,
      message: 'Something went wrong getting the answer!',
    })
  }

  return NextResponse.json({ data: answer, status: 200 })
}
