import { Zap } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Zap className="w-6 h-6" />
            <span className="ml-2 text-lg font-bold">Zappy</span>
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
          © 2024 Zappy. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
export default Footer;
