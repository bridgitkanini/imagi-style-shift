
import { Button } from '@/components/ui/button';
import { Sparkles, Menu, X } from 'lucide-react';
import { useState } from 'react';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              MagicTransform
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors font-medium">
              Gallery
            </a>
            <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors font-medium">
              Pricing
            </a>
            <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors font-medium">
              About
            </a>
            <Button 
              variant="outline" 
              className="border-purple-200 text-purple-600 hover:bg-purple-50"
            >
              Sign In
            </Button>
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white">
              Get Started
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white/95 backdrop-blur-md border-b border-white/20 p-4 space-y-4">
            <a href="#" className="block text-gray-600 hover:text-purple-600 transition-colors font-medium py-2">
              Gallery
            </a>
            <a href="#" className="block text-gray-600 hover:text-purple-600 transition-colors font-medium py-2">
              Pricing
            </a>
            <a href="#" className="block text-gray-600 hover:text-purple-600 transition-colors font-medium py-2">
              About
            </a>
            <div className="pt-4 space-y-2">
              <Button 
                variant="outline" 
                className="w-full border-purple-200 text-purple-600 hover:bg-purple-50"
              >
                Sign In
              </Button>
              <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white">
                Get Started
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
