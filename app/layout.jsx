import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from '@/components/layout/navbar'
import Footer from '@/components/common/Footer'
import GradientWrapper from '@/components/layout/GradientWrapper'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: 'Adorix - Advanced Campaign Studio',
    description: 'Adorix is a powerful campaign studio for your business.',
}

export default function RootLayout({
    children,
}) {
    return (
        <ClerkProvider
            appearance={{
                layout: {
                    logoPlacement: 'inside',
                    showOptionalFields: false,
                }
            }}
        >
            <html lang="en" suppressHydrationWarning>
                <body className={inter.className} suppressHydrationWarning>
                    <Navbar />
                    <GradientWrapper>
                        <main>{children}</main>
                    </GradientWrapper>
                    <Footer />
                </body>
            </html>
        </ClerkProvider>
    )
}
