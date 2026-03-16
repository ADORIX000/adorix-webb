import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from '@/components/layout/navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Adorix - Advanced Campaign Studio',
  description: 'Adorix is a powerful campaign studio for your business.',
}

export default function RootLayout({ children }) {
  return (
    <ClerkProvider afterSignOutUrl={process.env.NEXT_PUBLIC_LANDING_PAGE_URL || "https://adorix-landingpage.vercel.app/"}>
      <html lang="en" suppressHydrationWarning>
                <body className={`${inter.className} antialiased selection:bg-adorix-primary/10`} suppressHydrationWarning>
                    <Navbar />
                    <main className="pt-16">
                        {children}
                    </main>
                </body>
            </html>
        </ClerkProvider>
    )
}