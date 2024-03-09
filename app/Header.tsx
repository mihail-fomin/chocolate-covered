'use client'

import React from 'react'
import Container from './components/Container'
import Link from 'next/link'
import { Tabs } from '@radix-ui/themes'
import { usePathname } from 'next/navigation'
import { useAppSelector } from './lib/hooks'

const Header: React.FC = () => {
  const currentPath = usePathname()
  const activeCategory = useAppSelector(
    (state) => state.category.activeCategory,
  )

  // const links = [
  //   { label: 'Главная', href: '/', name: 'home' },
  //   {
  //     label: 'Товары',
  //     href: `/categories/${activeCategory}`,
  //     name: 'categories',
  //   },
  // ]

  const getDefaultValue = (currentPath: string) => {
    if (currentPath === '/') {
      return 'home'
    } else {
      return 'categories'
    }
  }

  return (
    <header className="bg-red-300 py-6">
      <Container>
        <nav>
          <Tabs.Root defaultValue={getDefaultValue(currentPath)}>
            <Tabs.List>
              <Tabs.Trigger value="home">
                <Link href="/">Главная</Link>
              </Tabs.Trigger>
              <Tabs.Trigger value="categories">
                <Link href={`/categories/${activeCategory}`}>Товары</Link>
              </Tabs.Trigger>
            </Tabs.List>
          </Tabs.Root>
        </nav>
        <img
          className="max-w-96 mx-auto mt-3"
          src="/images/logo.svg"
          alt="Логотип"
        />
      </Container>
    </header>
  )
}

export default Header
