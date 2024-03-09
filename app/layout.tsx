import React from 'react'
import type { Metadata } from 'next'
import { Theme } from '@radix-ui/themes'
import Header from './Header'
import './globals.css'
import '@radix-ui/themes/styles.css'
import Container from './components/Container'
import { Provider } from 'react-redux'
import { store } from './StoreProvider'

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
          <Provider store={store}>
            <Header />
            <Container>
              {children}
              {/* <ThemePanel /> */}
            </Container>
          </Provider>
        </Theme>
      </body>
    </html>
  )
}
