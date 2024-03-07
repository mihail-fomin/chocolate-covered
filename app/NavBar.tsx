'use client'

import React from 'react'
import categories from '../public/category.json'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Box, Button, ScrollArea } from '@radix-ui/themes'
import Container from './components/Container'
import NavLink from './components/NavLink'

const NavBar = () => {
  const currentPath = usePathname()

  return (
    <ScrollArea type='always' scrollbars='horizontal' style={{height: '4rem'}}>
      <Box p='2'>
        <ul className="flex gap-3">
          {categories.map((category) => (
            <NavLink category={category} currentPath={currentPath}/>
          ))}
        </ul>
      </Box>

    </ScrollArea>
  )
}

export default NavBar
