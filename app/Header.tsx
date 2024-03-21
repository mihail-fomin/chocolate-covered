'use client'

import React from 'react'
import Container from './components/Container'
import Link from 'next/link'
import { Flex } from '@radix-ui/themes'
import Image from 'next/image'
import Cart from './components/Cart/Cart'

const Header: React.FC = () => {
  return (
    <header className="bg-red-300 py-2">
      <Container>
        <nav>
          <Flex justify="between" align="center">
            <Link href="/">
              <Image
                className="h-12 p-2"
                width={100}
                height={100}
                src="/images/logo.svg"
                alt="Логотип"
              />
            </Link>
            <Cart />
          </Flex>
        </nav>
      </Container>
    </header>
  )
}

export default Header
