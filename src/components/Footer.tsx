import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

const Footer = () => {
  const footerSections = [
    {
      title: "Product",
      links: [
        { name: "Features", href: "#" },
        { name: "Pricing", href: "#" },
        { name: "API", href: "#" },
        { name: "Integrations", href: "#" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Blog", href: "#" },
        { name: "Documentation", href: "#" },
        { name: "Community", href: "#" },
        { name: "Help Center", href: "#" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About", href: "#" },
        { name: "Contact", href: "#" },
        { name: "Privacy Policy", href: "#" },
        { name: "Terms of Service", href: "#" },
      ],
    },
  ];

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Images?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of users who are already creating magical
            Ghibli-style artwork and action figures from their photos.
          </p>
          <Button
            size="lg"
            className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Get Started Now →
          </Button>
          <p className="text-sm mt-4 opacity-75">
            No credit card required for free plan
          </p>
        </div>
      </section>

      {/* Footer Links */}
      <div className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  ImageAlchemy
                </span>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Transform your ordinary photos into magical Ghibli-style artwork
                or action figures with our AI-powered image transformation.
              </p>
            </div>

            {/* Footer Sections */}
            {footerSections.map((section, index) => (
              <div key={index}>
                <h3 className="font-semibold text-gray-900 mb-6">
                  {section.title}
                </h3>
                <ul className="space-y-4">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      {link.name === "Features" ? (
                        <button
                          className="text-muted-foreground hover:text-purple-600 transition-colors"
                          onClick={() => {
                            const el = document.getElementById("features");
                            if (el) el.scrollIntoView({ behavior: "smooth" });
                          }}
                        >
                          Features
                        </button>
                      ) : link.name === "Pricing" ? (
                        <button
                          className="text-muted-foreground hover:text-purple-600 transition-colors"
                          onClick={() => {
                            const el = document.getElementById("pricing");
                            if (el) el.scrollIntoView({ behavior: "smooth" });
                          }}
                        >
                          Pricing
                        </button>
                      ) : link.name === "About" ? (
                        <button
                          className="text-muted-foreground hover:text-purple-600 transition-colors"
                          onClick={() => {
                            const el = document.getElementById("footer");
                            if (el) el.scrollIntoView({ behavior: "smooth" });
                          }}
                        >
                          About
                        </button>
                      ) : (
                        <a
                          href={link.href}
                          className="text-muted-foreground hover:text-purple-600 transition-colors"
                        >
                          {link.name}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-200 mt-12 pt-8 text-center">
            <p className="text-muted-foreground">
              © 2025 ImageAlchemy. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
