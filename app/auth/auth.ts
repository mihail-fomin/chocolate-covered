import { User } from 'next-auth'
import prisma from '../utils/connect'

import { compare } from 'bcrypt'

type LogInFn = (userName: string, password: string) => Promise<User>

export const login: LogInFn = async (userName, password) => {
  const user = await prisma.user.findFirst({
    where: {
      userName,
    },
  })

  if (!user) {
    throw new Error('User not found')
  }
  console.log('user: ', user)

  if (user && (await compare(password, user.password))) {
    user.password = ''
    return user
  } else throw new Error('Password is incorrect')
}
