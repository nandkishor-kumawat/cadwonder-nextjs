import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { Providers } from '@/components/providers/session-provider'
import Navbar from '@/components/header/navbar'
import GoogleAnalytics from '@/components/google-analytics'
import { Toaster } from '@/components/ui/sonner'
import { siteMetadata } from '@/lib/siteMetaData'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: {
    template: `%s | ${siteMetadata.title}`,
    default: siteMetadata.title,
  },
  description: siteMetadata.description,
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: siteMetadata.siteUrl,
    siteName: siteMetadata.title,
    images: [siteMetadata.socialBanner],
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    card: "summary_large_image",
    title: siteMetadata.title,
    // images: [siteMetadata.socialBanner],
  },
};



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <Toaster />
          <ThemeProvider
            attribute="class"
            defaultTheme="lignt"
            // enableSystem
            disableTransitionOnChange
          >
            {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS ? (
              <GoogleAnalytics ga_id=
                {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
            ) : null}
            <Navbar />
            <div style={{ height: 'calc(100% - 3.5rem)' }}>
              <div className="h-full overflow-hidden">
                <div className="h-full overflow-y-auto scrollbar">
                  {children}
                </div>
              </div>
            </div>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  )
}
