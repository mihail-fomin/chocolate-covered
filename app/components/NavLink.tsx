'use client'

import React from 'react'
import { Button } from '@radix-ui/themes'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface Props {
  category: {
    href: string
    rus: string
    image: string
  }
}

const NavLink = ({ category }: Props) => {
  const currentPath = usePathname()

  return (
    <li key={category.href} className="whitespace-nowrap">
      <Button
        variant={category.href === currentPath ? 'solid' : 'outline'}
        radius="full"
      >
        <Link href={category.href}>{category.rus}</Link>
      </Button>
    </li>
  )
}

export default NavLink
