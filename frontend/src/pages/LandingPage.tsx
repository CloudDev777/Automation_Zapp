import {
  ArrowRight,
  Zap,
  Workflow,
  Blocks,
  Lock,
  BarChart,
} from "lucide-react";

function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Zap className="w-8 h-8" />
              <span className="ml-2 text-xl font-bold">Automato</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#" className="hover:text-purple-200">
                Solutions
              </a>
              <a href="#" className="hover:text-purple-200">
                Pricing
              </a>
              <a href="#" className="hover:text-purple-200">
                Resources
              </a>
            </div>
            <button className="bg-white text-purple-600 px-6 py-2 rounded-lg font-semibold hover:bg-purple-50 transition-colors">
              Get Started Free
            </button>
          </div>
        </nav>

        <div className="container mx-auto px-6 py-24 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-8">
            Easy Automation for Busy People
          </h1>
          <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto text-purple-100">
            Connect your apps and automate workflows in minutes. No code
            required.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold hover:bg-purple-50 transition-colors flex items-center justify-center">
              Start For Free <ArrowRight className="ml-2 w-5 h-5" />
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-colors">
              Watch Demo
            </button>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-6">
                <Blocks className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Connect Apps</h3>
              <p className="text-gray-600">
                Connect your favorite apps in just a few clicks. We support
                3000+ integrations.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-6">
                <Workflow className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Build Workflows</h3>
              <p className="text-gray-600">
                Create automated workflows with our easy-to-use visual builder.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-6">
                <BarChart className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">See Results</h3>
              <p className="text-gray-600">
                Watch your productivity soar as your workflows run
                automatically.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-24">
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
      </section>

      {/* CTA Section */}
      <section className="bg-purple-600 text-white py-24">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-8">Ready to Get Started?</h2>
          <p className="text-xl mb-12 max-w-2xl mx-auto">
            Join thousands of teams who are already saving time with automated
            workflows.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold hover:bg-purple-50 transition-colors">
              Start For Free
            </button>
            <button className="border-2 border-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-colors">
              Contact Sales
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Zap className="w-6 h-6" />
              <span className="ml-2 text-lg font-bold">Automato</span>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="hover:text-white">
                Terms
              </a>
              <a href="#" className="hover:text-white">
                Privacy
              </a>
              <a href="#" className="hover:text-white">
                Security
              </a>
            </div>
          </div>
          <div className="mt-8 text-sm text-gray-500 text-center">
            © 2024 Automato. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
