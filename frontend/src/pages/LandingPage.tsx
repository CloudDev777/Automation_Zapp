import { CTASection, FeaturesSection, Footer, HeroSection } from "@/components";

function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* Social Proof */}
      {/* <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Trusted by 2M+ Users</h2>
            <p className="text-xl text-gray-600">
              Join the millions automating their work
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white p-8 rounded-xl shadow-sm border">
                <div className="flex items-center mb-4">
                  <img
                    src={`https://images.unsplash.com/photo-${
                      i === 1
                        ? "1472099645785-5658abf4ff4e"
                        : i === 2
                        ? "1494790108377-be9c29b29330"
                        : "1507003211169-0a1dd7228f2d"
                    }?auto=format&fit=crop&w=100&h=100&q=80`}
                    alt="User"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="ml-4">
                    <h4 className="font-semibold">Sarah Johnson</h4>
                    <p className="text-gray-600 text-sm">Marketing Director</p>
                  </div>
                </div>
                <p className="text-gray-600">
                  "This platform has completely transformed how we handle our
                  workflows. We've saved countless hours on repetitive tasks."
                </p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      <CTASection />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default LandingPage;
