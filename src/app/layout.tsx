import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { Providers } from '@/components/providers/session-provider'
import Navbar from '@/components/header/navbar'
import GoogleAnalytics from '@/components/google-analytics'
import { Toaster } from '@/components/ui/sonner'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CadWonder',
  description: 'Discover CadWonder, your go-to platform for tackling complex engineering questions. Dive into interactive problem-solving, explore a vast knowledge base, and join a thriving community. Elevate your engineering game with CadWonder – where brilliance meets innovation.',
}

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
