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
    <ClerkProvider publishableKey={clerkPublishableKey} clerkJSUrl={clerkJSUrl}>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className} suppressHydrationWarning>
          <GradientWrapper>
            <AuthenticatedNavbar />
            {children}
            <Footer />
          </GradientWrapper>
        </body>
      </html>
    </ClerkProvider>
  )
}