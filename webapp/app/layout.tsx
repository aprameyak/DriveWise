import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://drivewise.com'),
  title: 'DriveWise - Smart Car Recommendations & TCO Optimization',
  description: 'Make informed car buying decisions with DriveWise. Get personalized car recommendations, compare total cost of ownership, and optimize your automotive investments.',
  keywords: 'car recommendations, TCO, total cost of ownership, car comparison, automotive, car buying',
  authors: [{ name: 'DriveWise Team' }],
  robots: 'index, follow',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    title: 'DriveWise - Smart Car Recommendations',
    description: 'Make informed car buying decisions with DriveWise',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/favicon.svg',
        width: 1024,
        height: 1024,
        alt: 'DriveWise Logo',
      },
    ],
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-50">
          {children}
        </div>
      </body>
    </html>
  )
}
