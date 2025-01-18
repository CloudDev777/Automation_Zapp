import { BarChart, Blocks, Workflow } from "lucide-react";

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-12">
          <div className="text-center">
            <div className="bg-purple-100 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-6">
              <Blocks className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Connect Apps</h3>
            <p className="text-gray-600">
              Connect your favorite apps in just a few clicks. We support 3000+
              integrations.
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
              Watch your productivity soar as your workflows run automatically.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
export default FeaturesSection;
