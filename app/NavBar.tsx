import React from 'react'
import categories from '../public/category.json'
import { Box, ScrollArea } from '@radix-ui/themes'
import NavLink from './components/NavLink'

const NavBar = () => {
  return (
    <ScrollArea
      type="always"
      scrollbars="horizontal"
      style={{ height: '4rem' }}
    >
      <Box p="2">
        <ul className="flex gap-3">
          {categories.map((category) => (
            <NavLink category={category} />
          ))}
        </ul>
      </Box>
    </ScrollArea>
  )
}

export default NavBar
