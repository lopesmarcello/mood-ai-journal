import { auth } from '@clerk/nextjs'
import { prisma } from './db'

type GetUserByClerkIDProps = {
  include?: object
}

export const getUserByClerkID = async ({ include }: GetUserByClerkIDProps) => {
  const { userId } = await auth()

  const user = await prisma.user.findUniqueOrThrow({
    where: {
      clerkId: userId as string,
    },
    include,
  })

  return user
}
