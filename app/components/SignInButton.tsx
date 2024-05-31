'use client'

import React from 'react'

import { signIn, signOut, useSession } from 'next-auth/react'
import { Flex, Text, Button } from '@radix-ui/themes'
import Skeleton from './Skeleton'

const SignInButton = () => {
    const { status, data: session } = useSession()

    if (status === 'loading') return <Skeleton height='1.8rem' width="4rem" />

    if (session && session.user) {
        return (
        <Flex gap="4">
            <Text as="p">{session.user.name}</Text>
            <Button variant="classic" onClick={() => signOut()}>
            Выйти
            </Button>
        </Flex>
        )
    }
    return <Button onClick={() => signIn()}>Войти</Button>
}

export default SignInButton
