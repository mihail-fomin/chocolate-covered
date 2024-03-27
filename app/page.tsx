import { Flex } from '@radix-ui/themes'
import React from 'react'
import categories from '@/public/category.json'
import Link from 'next/link'
import CategoryCard from './components/CategoryCard'

export interface Category {
  title: string
  rus: string
  image: string
}

const page = async () => {
  const createHref = (category: Category) => `/categories/${category.title}`

  return (
    <>
      {/* <Categories /> */}
      <Flex justify={'center'}>
        <ul className="grid grid-cols-2 gap-4 mt-3 md:grid-cols-3 lg:grid-cols-4">
          {categories.map((category) => (
            <li key={category.title}>
              <Link href={createHref(category)}>
                <CategoryCard category={category} />
              </Link>
            </li>
          ))}
        </ul>
      </Flex>
    </>
  )
}

export default page
