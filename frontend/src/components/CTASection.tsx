const CTAsection = () => {
  return (
    <section id = "contact" className="bg-purple-600 text-white py-24">
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
  );
};
export default CTAsection;
