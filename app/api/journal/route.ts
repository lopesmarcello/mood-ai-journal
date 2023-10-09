import { getUser } from '@/utils/auth'
import { prisma } from '@/utils/db'
import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

export const POST = async () => {
  const user = await getUser()

  if (!user) {
    return NextResponse.json({
      status: 404,
      message:
        "Didn't find a user with this clerk ID on internal database. Please check if the app database is in sync with clerk",
    })
  }

  const entry = await prisma.journalEntry.create({
    data: {
      userId: user.id,
      content: 'Write about your day!',
    },
  })

  revalidatePath('/journal')

  return NextResponse.json({ data: { entry }, status: 200 })
}
