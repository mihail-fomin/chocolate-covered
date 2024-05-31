import React from 'react'
import type { Metadata } from 'next'
import { Theme } from '@radix-ui/themes'
import './globals.css'
import '@radix-ui/themes/styles.css'
import Container from './components/Container'
import StoreProvider from './StoreProvider'
import { Toaster } from 'react-hot-toast'
import NextTopLoader from 'nextjs-toploader'
import AuthProvider from './auth/Provider'

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
            <body className="relative">
                <AuthProvider>
                    <Theme accentColor="ruby">
                        <StoreProvider>
                            <NextTopLoader color="#991C30" />
                            <Toaster />
                            <Container>
                                {children}
                                {/* <ThemePanel /> */}
                            </Container>
                        </StoreProvider>
                    </Theme>
                </AuthProvider>
            </body>
        </html>
    )
}
