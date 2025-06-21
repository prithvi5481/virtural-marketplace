import React from 'react'
import './globals.css'
import { SocketProvider } from '@/context/SocketContext'
import Providers from '@/components/Providers'
import ThemeToggle from '@/components/ThemeToggle'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <ThemeToggle />
        <Providers>
          <SocketProvider>{children}</SocketProvider>
        </Providers>
      </body>
    </html>
  )
}