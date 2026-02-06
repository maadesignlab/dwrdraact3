import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import Pricing from '../components/section/home/Pricing'
import Hero from '../components/section/home/Hero'
import Services from '../components/section/home/Services'

function Home() {
    return (
    <>
        <Header />

        {/* Hero section */}
        <Hero />

        {/* Services section */}
        <Services />

        {/* Pricing section */}
        <Pricing />


        <Footer />
    </>
    );
}

export default Home;