import { useEffect } from 'react';
import { useSubscription } from '@/hooks/useSubscription';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Crown, Zap, Loader2, Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const PlanManagement = () => {
  const { subscriptionData, loading, checkSubscription, openCustomerPortal } = useSubscription();
  const { toast } = useToast();

  useEffect(() => {
    checkSubscription();
  }, []);

  const handleManageSubscription = () => {
    openCustomerPortal();
  };

  const handleRefreshStatus = () => {
    checkSubscription();
    toast({
      title: "Status Updated",
      description: "Subscription status has been refreshed",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
        <Navigation />
        <div className="pt-24 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentPlan = subscriptionData?.subscription_tier || 'free';
  const isSubscribed = subscriptionData?.subscribed || false;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <Navigation />
      
      <div className="pt-24 px-4 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
              Manage Your Plan
            </h1>
            <p className="text-lg text-muted-foreground">
              View your current subscription and manage your account
            </p>
          </div>

          {/* Current Plan Status */}
          <Card className="mb-8 bg-white/70 backdrop-blur-sm border-white/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    Current Plan
                    <Badge variant={isSubscribed ? "default" : "secondary"} className="ml-2">
                      {currentPlan === 'free' ? 'Free' : 
                       currentPlan === 'pro' ? 'Pro' : 
                       currentPlan === 'pro_plus' ? 'Pro Plus' : 'Free'}
                    </Badge>
                  </CardTitle>
                  <CardDescription>
                    {isSubscribed 
                      ? `You're subscribed to the ${currentPlan === 'pro' ? 'Pro' : 'Pro Plus'} plan`
                      : 'You are currently on the free plan'
                    }
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={handleRefreshStatus}>
                    Refresh Status
                  </Button>
                  {isSubscribed && (
                    <Button onClick={handleManageSubscription} className="flex items-center gap-2">
                      <Settings className="w-4 h-4" />
                      Manage Subscription
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="flex items-center justify-center w-16 h-16 mx-auto mb-3 rounded-full bg-purple-100">
                    <Zap className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="font-semibold mb-1">Usage Limit</h3>
                  <p className="text-sm text-muted-foreground">
                    {currentPlan === 'free' ? '5' : 
                     currentPlan === 'pro' ? '25' : 
                     currentPlan === 'pro_plus' ? '500' : '5'} generations per month
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="flex items-center justify-center w-16 h-16 mx-auto mb-3 rounded-full bg-blue-100">
                    <Crown className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold mb-1">Priority Support</h3>
                  <p className="text-sm text-muted-foreground">
                    {isSubscribed ? 'Included' : 'Not included'}
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="flex items-center justify-center w-16 h-16 mx-auto mb-3 rounded-full bg-green-100">
                    <Check className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="font-semibold mb-1">Advanced Features</h3>
                  <p className="text-sm text-muted-foreground">
                    {isSubscribed ? 'Unlimited access' : 'Limited access'}
                  </p>
                </div>
              </div>
              
              {subscriptionData?.subscription_end && (
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-700">
                    <strong>Next billing date:</strong> {new Date(subscriptionData.subscription_end).toLocaleDateString()}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Plan Features Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className={`bg-white/70 backdrop-blur-sm border-white/20 ${currentPlan === 'free' ? 'ring-2 ring-purple-500' : ''}`}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Free
                  {currentPlan === 'free' && <Badge>Current</Badge>}
                </CardTitle>
                <CardDescription>Perfect for getting started</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold mb-4">$0<span className="text-sm font-normal">/month</span></div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    5 generations per month
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    Basic image editing
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    Community support
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className={`bg-white/70 backdrop-blur-sm border-white/20 ${currentPlan === 'pro' ? 'ring-2 ring-purple-500' : ''}`}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Pro
                  {currentPlan === 'pro' && <Badge>Current</Badge>}
                </CardTitle>
                <CardDescription>For creative professionals</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold mb-4">$7.99<span className="text-sm font-normal">/month</span></div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    25 generations per month
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    Advanced editing tools
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    Priority support
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    High-resolution exports
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className={`bg-white/70 backdrop-blur-sm border-white/20 ${currentPlan === 'pro_plus' ? 'ring-2 ring-purple-500' : ''}`}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Pro Plus
                  {currentPlan === 'pro_plus' && <Badge>Current</Badge>}
                </CardTitle>
                <CardDescription>For power users and teams</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold mb-4">$19.99<span className="text-sm font-normal">/month</span></div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    500 generations per month
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    All Pro features
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    API access
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    Team collaboration
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {!isSubscribed && (
            <div className="mt-8 text-center">
              <p className="text-muted-foreground mb-4">Ready to upgrade your plan?</p>
              <Button asChild className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                <a href="/#pricing">View Pricing Plans</a>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlanManagement;