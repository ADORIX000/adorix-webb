import Navbar from '@/components/layout/navbar'
import Footer from '@/components/common/Footer'
import GradientWrapper from '@/components/layout/GradientWrapper'

export default function SiteLayout({
    children,
}) {
    return (
        <>
            <Navbar />
            <GradientWrapper>
                <main>{children}</main>
            </GradientWrapper>
            <Footer />
        </>
    )
}
