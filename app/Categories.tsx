import React from 'react'
import categories from '../public/category.json'
import { Flex, ScrollArea } from '@radix-ui/themes'
import CategoryLink from './components/CategoryLink'

const Categories = () => {
  return (
    <ScrollArea
    className='mt-16'
      type="always"
      scrollbars="horizontal"
      style={{ height: '4rem' }}
    >
      <Flex p="2" justify="center">
        <ul className="flex gap-3">
          {categories.map((category) => (
            <CategoryLink key={category.rus} category={category} />
          ))}
        </ul>
      </Flex>
    </ScrollArea>
  )
}

export default Categories
