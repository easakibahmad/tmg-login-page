import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { Inter } from 'next/font/google'
import { Toaster } from 'sonner'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'TMG Login',
  description: 'Login to TMG - KI-Plattform für den produzierenden Mittelstand',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased ${inter.variable}`}>
        {children}
        <Toaster 
          position="top-right" 
          toastOptions={{
            classNames: {
              error: '[&>svg]:text-[#E60000]',
            },
          }}
        />
      </body>
    </html>
  )
}
