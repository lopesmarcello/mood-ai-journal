import { auth } from '@clerk/nextjs'
import { prisma } from './db'

export const getUser = async (include = {}) => {
  const { userId } = await auth()

  const user = await prisma.user.findUniqueOrThrow({
    where: {
      clerkId: userId as string,
    },
    include,
  })

  return user
}
