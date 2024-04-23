import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

import { login } from '@/app/auth/auth'

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Sign in with username/password',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'Имя пользователя' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        if (!credentials?.username || !credentials?.password) return null
        try {
          const user = await login(credentials.username, credentials.password)
          return user
        } catch (error) {
          console.log(error)
          return null
        }
      },
    }),
  ],
  pages: {
    signIn: '/signIn',
  },
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
