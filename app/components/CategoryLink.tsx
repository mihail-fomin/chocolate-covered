'use client'

import React from 'react'
import { Button } from '@radix-ui/themes'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAppDispatch } from '../lib/hooks'
import { setActiveCategory } from '../lib/feature/category/categorySlice'

interface Props {
  category: {
    title: string
    rus: string
    image: string
  }
}

const CategoryLink = ({ category }: Props) => {
  const currentPath = usePathname()
  const dispatch = useAppDispatch()
  const href = `/categories/${category.title}`

  const handleCategoryClick = () => {
    dispatch(setActiveCategory({ categoryName: category.title }))
  }

  return (
    <li key={category.title} className="whitespace-nowrap">
      <Button
        variant={href === currentPath ? 'solid' : 'outline'}
        radius="full"
        onClick={handleCategoryClick}
      >
        <Link href={href}>{category.rus}</Link>
      </Button>
    </li>
  )
}

export default CategoryLink
