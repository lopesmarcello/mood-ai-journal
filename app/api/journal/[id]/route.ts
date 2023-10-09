import { analyzeEntry } from '@/utils/ai'
import { updateEntry } from '@/utils/api'
import { getUser } from '@/utils/auth'
import { prisma } from '@/utils/db'
import { revalidatePath } from 'next/cache'
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
    include: {
      analysis: true,
    },
    data: {
      content,
    },
  })

  const analysis = await analyzeEntry(content)

  const updated = await prisma.analysis.upsert({
    where: {
      entryId: id,
    },
    create: {
      userId: user.id,
      entryId: id,
      ...analysis,
    },
    update: analysis,
  })

  revalidatePath(`/journal/${id}`)
  revalidatePath(`/journal`)

  return NextResponse.json({
    data: { updatedEntry, analysis: updated },
    analysis: updated,
    status: 200,
  })
}

export const DELETE = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  const user = await getUser()
  const res = await prisma.journalEntry.delete({
    where: {
      userId: user.id,
      id: params.id,
    },
    include: {
      analysis: true,
    },
  })

  revalidatePath('/journal', 'page')
  return NextResponse.json({ data: res, status: 200 })
}
