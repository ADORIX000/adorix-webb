import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'
import { Inter } from 'next/font/google'
import AuthenticatedNavbar from '@/components/layout/AuthenticatedNavbar'
import GradientWrapper from '@/components/layout/GradientWrapper'
import Footer from '@/components/common/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Adorix - Advanced Campaign Studio',
  description: 'Adorix is a powerful campaign studio for your business.',
}

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <head>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                try {
                  if (localStorage.getItem('adorix-theme') === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (_) {}
              `,
            }}
          />
        </head>
        <body className={inter.className} suppressHydrationWarning>
          <GradientWrapper>
            <AuthenticatedNavbar />
            <main id="main-content">{children}</main>
            <Footer />
          </GradientWrapper>
        </body>
      </html>
    </ClerkProvider>
  )
}
