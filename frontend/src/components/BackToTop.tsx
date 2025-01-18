import  { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-3 bg-purple-600 text-white rounded-full shadow-lg hover:bg-purple-700 transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 z-50"
          aria-label="Back to top"
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      )}
    </>
  );
}

export default BackToTop;
