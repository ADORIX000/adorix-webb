import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: 'Adorix - Advanced Campaign Studio',
    description: 'Adorix is a powerful campaign studio for your business.',
}

export default function RootLayout({
    children,
}) {
    return (
        <html lang="en">
            <body className={inter.className} suppressHydrationWarning>
                <ClerkProvider
                    appearance={{
                        layout: {
                            logoPlacement: 'inside',
                            showOptionalFields: false,
                        }
                    }}
                >
                    {children}
                </ClerkProvider>
            </body>
        </html>
    )
}
