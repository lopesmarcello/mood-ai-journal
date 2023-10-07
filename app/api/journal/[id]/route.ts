import { updateEntry } from '@/utils/api'
import { getUser } from '@/utils/auth'
import { prisma } from '@/utils/db'
import { NextRequest, NextResponse } from 'next/server'

export const PATCH = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { content, id } = await request.json()
  const user = await getUser()
  const updatedEntry = await prisma.journalEntry.update({
    where: {
      userId_id: {
        userId: user.id,
        id: params.id,
      },
    },
    data: {
      content,
    },
  })

  return NextResponse.json({ data: updateEntry, status: 200 })
}
