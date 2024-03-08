import React from 'react'
import categories from '../public/category.json'
import { Box, Flex, ScrollArea } from '@radix-ui/themes'
import NavLink from './components/NavLink'

const NavBar = () => {
  return (
    <ScrollArea
      type="always"
      scrollbars="horizontal"
      style={{ height: '4rem' }}
    >
      <Flex p="2" justify="center">
        <ul className="flex gap-3">
          {categories.map((category) => (
            <NavLink key={category.rus} category={category} />
          ))}
        </ul>
      </Flex>
    </ScrollArea>
  )
}

export default NavBar
