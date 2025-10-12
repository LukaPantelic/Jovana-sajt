// app/layout.tsx
import type { Metadata } from 'next'
import './globals.css'
import { LanguageProvider } from './contexts/LanguageContext'
import Header from './src/components/Header/Header'
import Footer from './src/components/Footer/Footer'

export const metadata: Metadata = {
  title: 'Fotograf - Profesionalna fotografija',
  description: 'Portfolio profesionalnog fotografa',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="sr">
      <body>
        <LanguageProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  )
}