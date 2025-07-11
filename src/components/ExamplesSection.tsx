
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

const ExamplesSection = () => {
  const [activeTab, setActiveTab] = useState<'ghibli' | 'action-figure'>('ghibli');

  const examples = {
    ghibli: [
      {
        title: "Nature Scene",
        original: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=400&h=300&fit=crop",
        transformed: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop"
      },
      {
        title: "City Streets",
        original: "https://images.unsplash.com/photo-1527576539890-dfa815648363?w=400&h=300&fit=crop",
        transformed: "https://images.unsplash.com/photo-1488972685288-c3fd157d7c7a?w=400&h=300&fit=crop"
      },
      {
        title: "Portrait",
        original: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=300&fit=crop",
        transformed: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=400&h=300&fit=crop"
      }
    ],
    'action-figure': [
      {
        title: "Superhero",
        original: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop",
        transformed: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=400&h=300&fit=crop"
      },
      {
        title: "Space Explorer",
        original: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop",
        transformed: "https://images.unsplash.com/photo-1496307653780-42ee777d4833?w=400&h=300&fit=crop"
      },
      {
        title: "Adventure",
        original: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop",
        transformed: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=300&fit=crop"
      }
    ]
  };

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6">
            See The Magic In Action
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Check out these amazing before-and-after transformations created with our AI technology.
          </p>
          
          {/* Style Tabs */}
          <div className="flex justify-center gap-4 mb-12">
            <Button
              variant={activeTab === 'ghibli' ? 'default' : 'outline'}
              onClick={() => setActiveTab('ghibli')}
              className={activeTab === 'ghibli' 
                ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white' 
                : 'border-purple-200 text-purple-600 hover:bg-purple-50'
              }
            >
              Ghibli Style
            </Button>
            <Button
              variant={activeTab === 'action-figure' ? 'default' : 'outline'}
              onClick={() => setActiveTab('action-figure')}
              className={activeTab === 'action-figure' 
                ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white' 
                : 'border-purple-200 text-purple-600 hover:bg-purple-50'
              }
            >
              Action Figure
            </Button>
          </div>
        </div>

        {/* Examples Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {examples[activeTab].map((example, index) => (
            <div
              key={index}
              className="group relative bg-white/70 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-white/20"
            >
              <div className="relative">
                <div className="grid grid-cols-2">
                  <div className="relative">
                    <img 
                      src={example.original} 
                      alt={`${example.title} original`}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm rounded px-2 py-1">
                      <span className="text-xs font-medium text-gray-600">Original</span>
                    </div>
                  </div>
                  <div className="relative">
                    <img 
                      src={example.transformed} 
                      alt={`${example.title} transformed`}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute bottom-2 right-2 bg-purple-600 text-white rounded px-2 py-1">
                      <span className="text-xs font-medium">Transformed</span>
                    </div>
                  </div>
                </div>
                
                {/* Arrow */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg">
                  <ChevronRight className="w-4 h-4 text-purple-600" />
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-lg font-semibold text-center">{example.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExamplesSection;
