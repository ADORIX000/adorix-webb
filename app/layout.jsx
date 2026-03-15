import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Adorix - Advanced Campaign Studio',
  description: 'Adorix is a powerful campaign studio for your business.',
}

export default function RootLayout({ children }) {
  return (
    <ClerkProvider afterSignOutUrl={process.env.NEXT_PUBLIC_LANDING_PAGE_URL || "https://adorix-landingpage.vercel.app/"}>
      <html lang="en" suppressHydrationWarning>
                <body className={inter.className} suppressHydrationWarning>
                    {children}
                </body>
            </html>
        </ClerkProvider>
    )
}