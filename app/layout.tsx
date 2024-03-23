import React from 'react'
import type { Metadata } from 'next'
import { Theme } from '@radix-ui/themes'
import Header from './Header'
import './globals.css'
import '@radix-ui/themes/styles.css'
import Container from './components/Container'
import StoreProvider from './StoreProvider'
import { Toaster } from 'react-hot-toast'

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
          <StoreProvider>
            <Toaster />
            <Header />
            <Container>
              {children}
              {/* <ThemePanel /> */}
            </Container>
          </StoreProvider>
        </Theme>
      </body>
    </html>
  )
}
