import { Button } from "@/components/ui/button";
import { Sparkles, Menu, X, History, Settings } from "lucide-react";
import { useState, useEffect } from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/clerk-react";
import { Link, useLocation } from "react-router-dom";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const [activeSection, setActiveSection] = useState<string>("generate");

  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    const sectionIds = [
      "generate",
      "features",
      "examples",
      "pricing",
      "footer",
    ];
    const handleScroll = () => {
      let found = false;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 80 && rect.bottom > 80) {
            setActiveSection(id);
            found = true;
            break;
          }
        }
      }
      if (!found) setActiveSection("");
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              MagicTransform
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Home Button */}
            <Link
              to="/"
              className={`font-medium transition-colors ${
                isActive("/")
                  ? "text-purple-600"
                  : "text-gray-600 hover:text-purple-600"
              }`}
              onClick={(e) => {
                if (isActive("/")) {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
            >
              Home
            </Link>

            <button
              className="text-gray-600 hover:text-purple-600 transition-colors font-medium"
              onClick={() => {
                const el = document.getElementById("features");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
            >
              About
            </button>
            <button
              className="text-gray-600 hover:text-purple-600 transition-colors font-medium"
              onClick={() => {
                const el = document.getElementById("examples");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Gallery
            </button>
            <button
              className={`font-medium transition-colors ${
                activeSection === "generate"
                  ? "text-purple-600"
                  : "text-gray-600 hover:text-purple-600"
              }`}
              onClick={() => {
                const el = document.getElementById("generate");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Generate
            </button>
            <button
              className="text-gray-600 hover:text-purple-600 transition-colors font-medium"
              onClick={() => {
                const el = document.getElementById("pricing");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Pricing
            </button>

            <SignedIn>
              <Link
                to="/history"
                className={`font-medium transition-colors flex items-center gap-1 ${
                  isActive("/history")
                    ? "text-purple-600"
                    : "text-gray-600 hover:text-purple-600"
                }`}
              >
                <History className="w-4 h-4" />
                History
              </Link>
              <Link
                to="/plan"
                className={`font-medium transition-colors flex items-center gap-1 ${
                  isActive("/plan")
                    ? "text-purple-600"
                    : "text-gray-600 hover:text-purple-600"
                }`}
              >
                <Settings className="w-4 h-4" />
                Manage Plan
              </Link>
            </SignedIn>

            {/* Clerk Authentication Components */}
            <SignedOut>
              <SignInButton fallbackRedirectUrl="/">
                <Button
                  variant="outline"
                  className="border-purple-200 text-purple-600 hover:bg-purple-50"
                >
                  Sign In
                </Button>
              </SignInButton>
              <SignUpButton fallbackRedirectUrl="/">
                <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white">
                  Get Started
                </Button>
              </SignUpButton>
            </SignedOut>

            <SignedIn>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-8 h-8",
                  },
                }}
              />
            </SignedIn>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white/95 backdrop-blur-md border-b border-white/20 p-4 space-y-4">
            <Link
              to="/"
              className={`block font-medium py-2 transition-colors ${
                isActive("/")
                  ? "text-purple-600"
                  : "text-gray-600 hover:text-purple-600"
              }`}
              onClick={(e) => {
                setIsMenuOpen(false);
                if (isActive("/")) {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
            >
              Home
            </Link>

            <SignedIn>
              <Link
                to="/history"
                className={`font-medium py-2 transition-colors flex items-center gap-1 ${
                  isActive("/history")
                    ? "text-purple-600"
                    : "text-gray-600 hover:text-purple-600"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <History className="w-4 h-4" />
                History
              </Link>
              <Link
                to="/plan"
                className={`font-medium py-2 transition-colors flex items-center gap-1 ${
                  isActive("/plan")
                    ? "text-purple-600"
                    : "text-gray-600 hover:text-purple-600"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <Settings className="w-4 h-4" />
                Manage Plan
              </Link>
            </SignedIn>
            <button
              className="text-gray-600 hover:text-purple-600 transition-colors font-medium py-2"
              onClick={() => {
                setIsMenuOpen(false);
                const el = document.getElementById("features");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
            >
              About
            </button>
            <button
              className="text-gray-600 hover:text-purple-600 transition-colors font-medium py-2"
              onClick={() => {
                setIsMenuOpen(false);
                const el = document.getElementById("examples");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Gallery
            </button>
            <button
              className={`block font-medium py-2 transition-colors ${
                activeSection === "generate"
                  ? "text-purple-600"
                  : "text-gray-600 hover:text-purple-600"
              }`}
              onClick={() => {
                setIsMenuOpen(false);
                const el = document.getElementById("generate");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Generate
            </button>
            <button
              className="text-gray-600 hover:text-purple-600 transition-colors font-medium py-2"
              onClick={() => {
                setIsMenuOpen(false);
                const el = document.getElementById("pricing");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Pricing
            </button>
            {/* Mobile Clerk Authentication */}
            <div className="pt-4 space-y-2">
              <SignedOut>
                <SignInButton fallbackRedirectUrl="/">
                  <Button
                    variant="outline"
                    className="w-full border-purple-200 text-purple-600 hover:bg-purple-50"
                  >
                    Sign In
                  </Button>
                </SignInButton>
                <SignUpButton fallbackRedirectUrl="/">
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white">
                    Get Started
                  </Button>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <div className="flex justify-center pt-2">
                  <UserButton
                    appearance={{
                      elements: {
                        avatarBox: "w-8 h-8",
                      },
                    }}
                  />
                </div>
              </SignedIn>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
