-- Create subscribers table to track subscription information
CREATE TABLE public.subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  stripe_customer_id TEXT,
  subscribed BOOLEAN NOT NULL DEFAULT false,
  subscription_tier TEXT CHECK (subscription_tier IN ('free', 'pro', 'pro_plus')),
  subscription_end TIMESTAMPTZ,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create usage tracking table
CREATE TABLE public.usage_tracking (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  month_year TEXT NOT NULL, -- Format: 'YYYY-MM'
  generations_used INTEGER NOT NULL DEFAULT 0,
  edits_used INTEGER NOT NULL DEFAULT 0,
  total_used INTEGER GENERATED ALWAYS AS (generations_used + edits_used) STORED,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, month_year)
);

-- Enable Row Level Security
ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.usage_tracking ENABLE ROW LEVEL SECURITY;

-- Create policies for subscribers table
CREATE POLICY "select_own_subscription" ON public.subscribers
FOR SELECT
USING (user_id = auth.uid() OR email = auth.email());

CREATE POLICY "update_own_subscription" ON public.subscribers
FOR UPDATE
USING (true);

CREATE POLICY "insert_subscription" ON public.subscribers
FOR INSERT
WITH CHECK (true);

-- Create policies for usage_tracking table
CREATE POLICY "select_own_usage" ON public.usage_tracking
FOR SELECT
USING (user_id = auth.uid());

CREATE POLICY "update_own_usage" ON public.usage_tracking
FOR UPDATE
USING (true);

CREATE POLICY "insert_usage" ON public.usage_tracking
FOR INSERT
WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX idx_subscribers_user_email ON public.subscribers (user_id, email);
CREATE INDEX idx_usage_tracking_user_month ON public.usage_tracking (user_id, month_year);

-- Create function to get user's monthly limits
CREATE OR REPLACE FUNCTION public.get_user_limits(user_email TEXT)
RETURNS TABLE (
  generation_limit INTEGER,
  current_usage INTEGER,
  subscription_tier TEXT
) 
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  user_tier TEXT;
  user_id_val UUID;
  current_month TEXT;
  usage_count INTEGER;
BEGIN
  -- Get current month in YYYY-MM format
  current_month := to_char(now(), 'YYYY-MM');
  
  -- Get user info
  SELECT s.subscription_tier, s.user_id INTO user_tier, user_id_val
  FROM public.subscribers s 
  WHERE s.email = user_email;
  
  -- If no subscription found, default to free
  IF user_tier IS NULL THEN
    user_tier := 'free';
  END IF;
  
  -- Get current month usage
  SELECT COALESCE(total_used, 0) INTO usage_count
  FROM public.usage_tracking ut
  WHERE ut.user_id = user_id_val AND ut.month_year = current_month;
  
  -- Set limits based on tier
  CASE user_tier
    WHEN 'free' THEN
      generation_limit := 5;
    WHEN 'pro' THEN 
      generation_limit := 25;
    WHEN 'pro_plus' THEN
      generation_limit := 500;
    ELSE
      generation_limit := 5; -- Default to free
  END CASE;
  
  RETURN QUERY SELECT generation_limit, COALESCE(usage_count, 0), user_tier;
END;
$$;