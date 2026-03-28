import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'
import { Inter } from 'next/font/google'
import AuthenticatedNavbar from '@/components/layout/AuthenticatedNavbar'
import GradientWrapper from '@/components/layout/GradientWrapper'
import Footer from '@/components/common/Footer'

const inter = Inter({ subsets: ['latin'] })
const clerkPublishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY?.trim()

function getClerkFrontendApiFromPublishableKey(key) {
  if (!key) return undefined

  const encodedPart = key.replace(/^pk_(test|live)_/, '')

  try {
    const decoded = Buffer.from(encodedPart, 'base64').toString('utf8').trim()
    return decoded.endsWith('$') ? decoded.slice(0, -1) : decoded
  } catch {
    return undefined
  }
}

const clerkFrontendApi = getClerkFrontendApiFromPublishableKey(clerkPublishableKey)
const clerkJSUrl = process.env.NEXT_PUBLIC_CLERK_JS_URL
  || (clerkFrontendApi
    ? `https://${clerkFrontendApi}/npm/@clerk/clerk-js@latest/dist/clerk.browser.js`
    : 'https://cdn.jsdelivr.net/npm/@clerk/clerk-js@latest/dist/clerk.browser.js')

export const metadata = {
  title: 'Adorix - Advanced Campaign Studio',
  description: 'Adorix is a powerful campaign studio for your business.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <head suppressHydrationWarning>
        <script
          suppressHydrationWarning
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
      <ClerkProvider>
        <body className={`${inter.className} overflow-x-hidden w-full`} suppressHydrationWarning>
          <GradientWrapper>
            <AuthenticatedNavbar />
            <main id="main-content">{children}</main>
            <Footer />
          </GradientWrapper>
        </body>
      </ClerkProvider>
    </html>
  )
}
