'use client'

import React from 'react'
import AuthProvider from './auth/Provider'
import { Theme } from '@radix-ui/themes'
import StoreProvider from './StoreProvider'
import NextTopLoader from 'nextjs-toploader'
import { Toaster } from 'react-hot-toast'
import './globals.css'
import '@radix-ui/themes/styles.css'

import Container from './components/Container'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import 'dayjs/locale/ru'
import { metadata } from './metadata'

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="ru">
            <head>
                <title>{metadata.title as string}</title>
                <meta name="description" content={metadata.description as string} />
            </head>
            <body className="relative">
                <AuthProvider>
                    <Theme accentColor="ruby">
                        <StoreProvider>
                            <NextTopLoader color="#991C30" />
                            <Toaster />
                            <Container>
                                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
                                    {children}
                                    {/* <ThemePanel /> */}
                                </LocalizationProvider>
                            </Container>
                        </StoreProvider>
                    </Theme>
                </AuthProvider>
            </body>
        </html>
    )
}
