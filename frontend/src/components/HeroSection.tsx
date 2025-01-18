import { ArrowRight, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <header className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Zap className="w-8 h-8" />
            <span className="ml-2 text-xl font-bold">Zappy</span>
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
          Connect your apps and automate workflows in minutes. No code required.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to={"sign-up"}
            className="bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold hover:bg-purple-50 transition-colors flex items-center justify-center"
          >
            Start For Free <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
          <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-colors">
            Watch Demo
          </button>
        </div>
      </div>
    </header>
  );
};
export default HeroSection;
