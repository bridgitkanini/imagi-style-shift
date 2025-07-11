
import { Sparkles, Zap, Image as ImageIcon, Clock, Settings, Share2 } from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: Sparkles,
      title: "Ghibli Transformation",
      description: "Transform your photos into the enchanting hand-drawn style of Studio Ghibli animations."
    },
    {
      icon: Zap,
      title: "Action Figure Mode",
      description: "Turn yourself or any subject into a detailed, glossy action figure with perfect proportions."
    },
    {
      icon: ImageIcon,
      title: "High Resolution",
      description: "Get stunning high-resolution transformations that preserve the details of your original images."
    },
    {
      icon: Clock,
      title: "Fast Processing",
      description: "Our advanced AI processes your images in seconds, not minutes or hours."
    },
    {
      icon: Settings,
      title: "Batch Processing",
      description: "Transform multiple images at once with our efficient batch processing system."
    },
    {
      icon: Share2,
      title: "Easy Sharing",
      description: "Share your transformed images directly to social media or download in various formats."
    }
  ];

  return (
    <section className="py-20 px-4 bg-white/50 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6">
            Powerful AI Transformation Features
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our platform leverages cutting-edge AI to deliver stunning image transformations with just a few clicks.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-white/20"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center mb-6">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
