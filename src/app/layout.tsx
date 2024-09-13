import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/header'
import GoogleAnalytics from '@/components/google-analytics'
import { Toaster } from '@/components/ui/sonner'
import { siteMetadata } from '@/lib/siteMetaData'
import NextTopLoader from 'nextjs-toploader';
import { SessionProvider, ThemeProvider } from '@/components/providers'
import { Footer } from '@/components/footer'
import { cn } from '@/lib/utils'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: {
    template: `%s | ${siteMetadata.title}`,
    default: siteMetadata.title,
  },
  verification: {
    google: process.env.GOOGLE_VERIFICATION,
  },
  description: siteMetadata.description,
  keywords: siteMetadata.keywords,
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
      <body className={cn(inter.className)}>
        <NextTopLoader color='rgb(251 146 60)' showSpinner={false} />
        <SessionProvider>
          <Toaster position="top-right" duration={2000} />
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

            <Header />

            <div className='h-body'>
              <div className="h-full overflow-hidden">
                <div className="h-full overflow-y-auto scrollbar">
                  <div className="min-h-body">
                    {children}
                  </div>
                  <Footer />
                </div>
              </div>
            </div>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
