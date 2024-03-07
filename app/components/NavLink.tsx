import { Button } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'

interface Props {
  category:  {
    href: string;
    rus: string;
    image: string;
  }
  currentPath: string
}

const NavLink = ({ category, currentPath }: Props) => {
  return (
    <li key={category.href} className='whitespace-nowrap'>
    <Button
      variant={category.href === currentPath ? 'solid' : 'outline'}
      >
      <Link href={category.href}>{category.rus}</Link>
    </Button>
  </li>

  )
}

export default NavLink