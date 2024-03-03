'use client'

import React from 'react'
import categories from '../public/category.json'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@radix-ui/themes'
import Container from './components/Container'

const NavBar = () => {
  const currentPath = usePathname()

  return (
    <Container>
      <ul className="grid grid-rows-3 grid-flow-col gap-2 mt-3 text-center md:grid-rows-2">
        {categories.map((category) => (
          <li key={category.href}>
            <Button
              variant={category.href === currentPath ? 'solid' : 'outline'}
            >
              <Link href={category.href}>{category.rus}</Link>
            </Button>
          </li>
        ))}
      </ul>
    </Container>
  )
}

export default NavBar
