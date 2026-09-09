import Navbar from '../components/landing/Navbar';
import Hero from '../components/landing/Hero';
import HowItWorks from '../components/landing/HowItWorks';
import Features from '../components/landing/Features';


const LandingPage = () => {
    return (
        <>
            <Navbar />
            <main>
                <Hero />
                <HowItWorks />
                <Features />
            </main>
        </>
    );
};

export default LandingPage;