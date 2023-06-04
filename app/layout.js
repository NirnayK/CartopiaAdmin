import './globals.css'
import { Inter } from 'next/font/google'
import CustomSessionProvider from '@/components/CustomSessionProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Cartopia',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="bg-white">
      <CustomSessionProvider>
        <body className={inter.className}>{children}</body>
      </CustomSessionProvider>
    </html>
  )
}
