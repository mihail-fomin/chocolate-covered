import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { comparePasswords } from './app/utils/password'
import { getUserFromDb } from './app/utils/user'

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        userName: {},
        password: {},
      },
      authorize: async (credentials) => {
        let user = null

        const { userName, password } = credentials as { userName: string; password: string }

        user = await getUserFromDb(userName)

        if (!user) {
          throw new Error('User not found.')
        }

        const isValid = await comparePasswords(password, user.passwordHash)

        if (!isValid) {
          throw new Error('Invalid password')
        }

        return user
      },
    }),
  ],
})
