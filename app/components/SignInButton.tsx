'use client'

import React from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'
import { Flex, Text, Button } from '@radix-ui/themes'

const SignInButton = () => {
  const { data: session } = useSession()

  if (session && session.user) {
    return (
      <Flex gap="4">
        <Text as="p">{session.user.name}</Text>
        <Button variant="outline" onClick={() => signOut()}>
          Sign Out
        </Button>
      </Flex>
    )
  }
  return <Button onClick={() => signIn()}>Sign In</Button>
}

export default SignInButton
