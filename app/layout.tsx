import React from 'react'
import type { Metadata } from 'next'
import { Theme } from '@radix-ui/themes'
import Header from './Header'
import NavBar from './NavBar'

import './globals.css'
import '@radix-ui/themes/styles.css'

export const metadata: Metadata = {
  title: 'Все в шоколаде',
  description: 'Кондитерская "Все в шоколаде"',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru">
      <body>
        <Theme accentColor="ruby">
          <Header />
          <NavBar />
          {children}
          {/* <ThemePanel /> */}
        </Theme>
      </body>
    </html>
  )
}
