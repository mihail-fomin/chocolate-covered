'use client'

import React from 'react'
import Container from './components/Container'
import Link from 'next/link'
import { Flex, Tabs } from '@radix-ui/themes'
import { usePathname } from 'next/navigation'
import { useAppSelector } from './lib/hooks'
import { getDefaultValue } from './utils'

const Header: React.FC = () => {
  const currentPath = usePathname()
  const activeCategory = useAppSelector(
    (state) => state.category.activeCategory,
  )

  const links = [
    { label: 'Главная', href: '/', name: 'home' },
    {
      label: 'Товары',
      href: `/categories/${activeCategory}`,
      name: 'categories',
    },
  ]

  return (
    <header className="bg-red-300 py-6">
      <Container>
        <nav>
          <Tabs.Root defaultValue={getDefaultValue(currentPath)}>
            <Tabs.List>
              <Flex justify="between">
                {links.map((link) => (
                  <Tabs.Trigger value={link.name} key={link.name}>
                    <Link href={link.href}>{link.label}</Link>
                  </Tabs.Trigger>
                ))}
                <Tabs.Trigger value="cart">
                  <Link href="/cart">Корзрина</Link>
                </Tabs.Trigger>
              </Flex>
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
