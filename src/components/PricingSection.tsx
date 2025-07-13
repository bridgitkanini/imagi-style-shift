
import { Button } from '@/components/ui/button';
import { Check, Crown, Zap } from 'lucide-react';
import { useSubscription } from '@/hooks/useSubscription';

const PricingSection = () => {
  const { subscriptionData, createCheckout, openCustomerPortal } = useSubscription();
  
  const plans = [
    {
      id: "free",
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for trying out AI image generation",
      features: [
        "5 image generations per month",
        "5 image edits per month", 
        "Standard resolution",
        "Basic styles",
        "Community support"
      ],
      buttonText: "Current Plan",
      buttonVariant: "outline" as const,
      popular: false,
      icon: <Check className="w-5 h-5" />
    },
    {
      id: "pro",
      name: "Pro",
      price: "$10",
      period: "per month",
      description: "For content creators and professionals",
      features: [
        "25 image generations per month",
        "25 image edits per month",
        "High resolution output",
        "All style options",
        "Priority processing",
        "Email support"
      ],
      buttonText: "Subscribe to Pro",
      buttonVariant: "default" as const,
      popular: true,
      icon: <Zap className="w-5 h-5" />
    },
    {
      id: "pro_plus",
      name: "Pro Plus", 
      price: "$50",
      period: "per month",
      description: "For power users and agencies",
      features: [
        "500 image generations per month",
        "500 image edits per month",
        "Max resolution output",
        "All style options + experimental",
        "Instant processing",
        "Priority support",
        "Commercial license"
      ],
      buttonText: "Subscribe to Pro Plus",
      buttonVariant: "outline" as const,
      popular: false,
      icon: <Crown className="w-5 h-5" />
    }
  ];

  const handlePlanAction = (planId: string) => {
    if (planId === 'free') return;
    
    if (subscriptionData?.subscription_tier === planId && subscriptionData?.subscribed) {
      openCustomerPortal();
    } else {
      createCheckout(planId);
    }
  };

  const getButtonText = (plan: any) => {
    if (plan.id === 'free') {
      return subscriptionData?.subscription_tier === 'free' ? 'Current Plan' : 'Downgrade to Free';
    }
    
    if (subscriptionData?.subscription_tier === plan.id && subscriptionData?.subscribed) {
      return 'Manage Subscription';
    }
    
    return plan.buttonText;
  };

  const isPlanActive = (planId: string) => {
    return subscriptionData?.subscription_tier === planId && 
           (planId === 'free' || subscriptionData?.subscribed);
  };

  return (
    <section className="py-20 px-4 bg-white/50 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Choose the plan that's right for you and start transforming your images today.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => {
            const isActive = isPlanActive(plan.id);
            return (
              <div
                key={index}
                className={`relative bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border ${
                  plan.popular 
                    ? 'border-purple-300 ring-2 ring-purple-200 scale-105' 
                    : isActive
                    ? 'border-green-300 ring-2 ring-green-200'
                    : 'border-white/20 hover:border-purple-200'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                      Most Popular
                    </div>
                  </div>
                )}

                {isActive && (
                  <div className="absolute -top-4 right-4">
                    <div className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      Active
                    </div>
                  </div>
                )}

                <div className="text-center mb-8">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-white">
                      {plan.icon}
                    </div>
                    <h3 className="text-2xl font-bold">{plan.name}</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">{plan.description}</p>
                  <div className="mb-6">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground ml-2">{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant={isActive ? "outline" : plan.buttonVariant}
                  onClick={() => handlePlanAction(plan.id)}
                  disabled={plan.id === 'free' && subscriptionData?.subscription_tier === 'free'}
                  className={`w-full py-3 text-lg font-semibold rounded-full transition-all duration-300 ${
                    isActive
                      ? 'border-green-500 text-green-600 hover:bg-green-50'
                      : plan.buttonVariant === 'default'
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl'
                      : 'border-purple-200 text-purple-600 hover:bg-purple-50'
                  }`}
                >
                  {getButtonText(plan)}
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
