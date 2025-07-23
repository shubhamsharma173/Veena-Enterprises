import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Favicon from './components/Favicon'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Veena Enterprises - Solar Services | Jaipur',
    template: '%s | Veena Enterprises Solar Services'
  },
  description: 'Leading solar panel installation, on-grid & off-grid systems, solar inverters & batteries, maintenance & AMC services in Jaipur. Government subsidy assistance available.',
  keywords: [
    'solar panel installation',
    'solar services',
    'solar panels Jaipur',
    'on-grid solar system',
    'off-grid solar system',
    'solar inverters',
    'solar batteries',
    'solar maintenance',
    'AMC services',
    'government solar subsidy',
    'solar power solutions',
    'renewable energy',
    'green energy',
    'solar company Jaipur'
  ],
  authors: [{ name: 'Veena Enterprises' }],
  creator: 'Veena Enterprises',
  publisher: 'Veena Enterprises',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://veenaenterprises.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Veena Enterprises - Solar Services | Jaipur',
    description: 'Leading solar panel installation, on-grid & off-grid systems, solar inverters & batteries, maintenance & AMC services in Jaipur. Government subsidy assistance available.',
    url: 'https://veenaenterprises.com',
    siteName: 'Veena Enterprises Solar Services',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Veena Enterprises Solar Services',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Veena Enterprises - Solar Services | Jaipur',
    description: 'Leading solar panel installation, on-grid & off-grid systems, solar inverters & batteries, maintenance & AMC services in Jaipur.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="alternate icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#FFD700" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Veena Enterprises Solar Services",
              "description": "Leading solar panel installation and solar services in Jaipur",
              "url": "https://veenaenterprises.com",
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "26.9124",
                "longitude": "75.7873"
              },
              "openingHours": "Mo-Su 09:00-18:00",
              "priceRange": "₹₹",
              "serviceArea": {
                "@type": "City",
                "name": "Jaipur"
              },
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Solar Services",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Solar Panel Installation"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "On-Grid & Off-Grid Systems"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Solar Inverters & Batteries"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Maintenance & AMC Services"
                    }
                  }
                ]
              }
            })
          }}
        />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <Favicon />
        {children}
      </body>
    </html>
  )
} 