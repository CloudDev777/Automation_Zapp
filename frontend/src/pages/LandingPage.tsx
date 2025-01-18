import {
  CTASection,
  FeaturesSection,
  Footer,
  HeroSection,
  BackToTop,
} from "@/components";
import SocialProofSection from "@/components/SocialProofSection";

function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* Social Proof */}
      <SocialProofSection />

      {/* CTA Section */}
      <CTASection />

      {/* Footer */}
      <Footer />

      <BackToTop />
    </div>
  );
}

export default LandingPage;
