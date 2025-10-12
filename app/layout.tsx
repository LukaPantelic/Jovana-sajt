// app/layout.tsx
import type { Metadata } from 'next'
import './globals.css'
import Header from './src/components/Header/Header'
import Footer from './src/components/Footer/Footer'

export const metadata: Metadata = {
  title: 'Jolline digitalart - Profesionalna fotografija',
  description: 'Jolline digitalart - Profesionalna fotografija',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="sr">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}