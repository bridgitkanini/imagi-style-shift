
import { Button } from '@/components/ui/button';
import { Sparkles, Zap } from 'lucide-react';

interface StyleSelectorProps {
  selectedStyle: 'ghibli' | 'action-figure' | null;
  onStyleSelect: (style: 'ghibli' | 'action-figure') => void;
}

const StyleSelector = ({ selectedStyle, onStyleSelect }: StyleSelectorProps) => {
  const styles = [
    {
      id: 'ghibli' as const,
      name: 'Ghibli Magic',
      description: 'Transform into magical Studio Ghibli-style artwork with watercolor aesthetics',
      icon: Sparkles,
      gradient: 'from-green-400 to-blue-500',
      borderColor: 'border-green-200',
      bgColor: 'bg-green-50',
      textColor: 'text-green-700'
    },
    {
      id: 'action-figure' as const,
      name: 'Action Figure',
      description: 'Create a collectible action figure render with dramatic lighting and details',
      icon: Zap,
      gradient: 'from-orange-400 to-red-500',
      borderColor: 'border-orange-200',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-700'
    }
  ];

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {styles.map((style) => {
        const Icon = style.icon;
        const isSelected = selectedStyle === style.id;
        
        return (
          <Button
            key={style.id}
            onClick={() => onStyleSelect(style.id)}
            variant="outline"
            className={`h-auto p-6 flex flex-col items-start text-left space-y-3 transition-all duration-300 hover:scale-105 ${
              isSelected 
                ? `${style.borderColor} ${style.bgColor} border-2 shadow-lg` 
                : 'border-gray-200 hover:border-purple-200 hover:bg-purple-25'
            }`}
          >
            <div className="flex items-center gap-3 w-full">
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${style.gradient} flex items-center justify-center`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h3 className={`font-semibold text-lg ${isSelected ? style.textColor : 'text-gray-700'}`}>
                  {style.name}
                </h3>
              </div>
              {isSelected && (
                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              )}
            </div>
            
            <p className={`text-sm ${isSelected ? style.textColor + ' opacity-80' : 'text-gray-500'} leading-relaxed`}>
              {style.description}
            </p>
          </Button>
        );
      })}
    </div>
  );
};

export default StyleSelector;
