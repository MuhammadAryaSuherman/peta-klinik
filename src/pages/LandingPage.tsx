import Navbar from '@/components/landing/Navbar';
import HeroSection from '@/components/landing/HeroSection';
import ServicesSection from '@/components/landing/ServicesSection';
import HouseIndicatorsSection from '@/components/landing/HouseIndicatorsSection';
import BuildingStepsSection from '@/components/landing/BuildingStepsSection';
import AboutSection from '@/components/landing/AboutSection';
import Footer from '@/components/landing/Footer';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <ServicesSection />
        <HouseIndicatorsSection />
        <BuildingStepsSection />
        <AboutSection />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
