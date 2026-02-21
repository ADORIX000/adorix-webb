import Navbar from '../components/layout/navbar';
import GradientWrapper from '../components/layout/GradientWrapper';
import Footer from '../components/common/Footer';
import './globals.css';

export const metadata = {
    title: 'Adorix Webb',
    description: 'Adorix Webb Application',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body suppressHydrationWarning>
                <GradientWrapper>
                    <Navbar />
                    {children}
                    <Footer />
                </GradientWrapper>
            </body>
        </html>
    );
}
