import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })
const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  title: 'MusicBae - Music Before Anyone Else',
  description: 'Discover and support emerging artists through our revolutionary tipping platform. Create, Share, Receive.',
  keywords: 'music, artists, tipping, platform, discovery, support',
  authors: [{ name: 'MusicBae Team' }],
  openGraph: {
    title: 'MusicBae - Music Before Anyone Else',
    description: 'Discover and support emerging artists through our revolutionary tipping platform.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MusicBae - Music Before Anyone Else',
    description: 'Discover and support emerging artists through our revolutionary tipping platform.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} ${poppins.variable} font-sans min-h-full bg-artist-gradient text-white`}>
        {children}
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#1f2937',
              color: '#fff',
              borderRadius: '12px',
            },
          }}
        />
      </body>
    </html>
  )
}
