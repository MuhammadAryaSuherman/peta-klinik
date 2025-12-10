import Navbar from '@/components/landing/Navbar';
import HeroSection from '@/components/landing/HeroSection';
import ServicesSection from '@/components/landing/ServicesSection';
import AboutSection from '@/components/landing/AboutSection';
import HousingIndicatorsSection from '@/components/landing/HousingIndicatorsSection';
import BuildingStepsSection from '@/components/landing/BuildingStepsSection';
import Footer from '@/components/landing/Footer';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <ServicesSection />
        <AboutSection />
        <HousingIndicatorsSection />
        <BuildingStepsSection />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
