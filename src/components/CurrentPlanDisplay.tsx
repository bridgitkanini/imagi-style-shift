import { useSubscription } from '@/hooks/useSubscription';
import { Badge } from '@/components/ui/badge';
import { Crown, Zap } from 'lucide-react';

export const CurrentPlanDisplay = () => {
  const { subscriptionData, loading } = useSubscription();

  if (loading) return null;

  const currentPlan = subscriptionData?.subscription_tier || 'free';
  const isSubscribed = subscriptionData?.subscribed || false;
  const usageLimit = subscriptionData?.usage_limit || 5;

  const getPlanIcon = () => {
    if (currentPlan === 'pro_plus') return <Crown className="w-4 h-4 text-yellow-500" />;
    if (currentPlan === 'pro') return <Zap className="w-4 h-4 text-blue-500" />;
    return <Zap className="w-4 h-4 text-gray-500" />;
  };

  const getPlanName = () => {
    if (currentPlan === 'pro_plus') return 'Pro Plus';
    if (currentPlan === 'pro') return 'Pro';
    return 'Free';
  };

  const getPlanVariant = () => {
    if (currentPlan === 'pro_plus') return 'default';
    if (currentPlan === 'pro') return 'secondary';
    return 'outline';
  };

  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/50 backdrop-blur-sm border border-white/20">
      {getPlanIcon()}
      <span className="text-sm font-medium text-gray-700">
        {getPlanName()} Plan
      </span>
      <Badge variant={getPlanVariant()} className="text-xs">
        {usageLimit} generations
      </Badge>
    </div>
  );
};