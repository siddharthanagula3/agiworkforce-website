-- AGI Workforce Database Schema
-- Run this in Supabase SQL Editor to set up the database

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends auth.users)
CREATE TABLE public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  display_name TEXT,
  plan TEXT NOT NULL DEFAULT 'free' CHECK (plan IN ('free', 'pay-per-result', 'pro', 'enterprise')),
  plan_status TEXT NOT NULL DEFAULT 'active' CHECK (plan_status IN ('active', 'trial', 'cancelled', 'past_due')),
  trial_ends_at TIMESTAMPTZ,
  stripe_customer_id TEXT UNIQUE,
  stripe_subscription_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Devices table
CREATE TABLE public.devices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  platform TEXT NOT NULL CHECK (platform IN ('windows', 'macos', 'linux')),
  app_version TEXT,
  fingerprint TEXT,
  token_hash TEXT NOT NULL,
  linked_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_seen_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Device link requests table (for device linking flow)
CREATE TABLE public.device_links (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code TEXT NOT NULL UNIQUE,
  device_name TEXT NOT NULL,
  platform TEXT NOT NULL CHECK (platform IN ('windows', 'macos', 'linux')),
  app_version TEXT,
  fingerprint TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'expired', 'cancelled')),
  user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  device_id UUID REFERENCES public.devices(id) ON DELETE SET NULL,
  device_token TEXT, -- Temporarily stores token for desktop app retrieval
  expires_at TIMESTAMPTZ NOT NULL,
  approved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_users_email ON public.users(email);
CREATE INDEX idx_users_stripe_customer_id ON public.users(stripe_customer_id);
CREATE INDEX idx_devices_user_id ON public.devices(user_id);
CREATE INDEX idx_devices_token_hash ON public.devices(token_hash);
CREATE INDEX idx_device_links_code ON public.device_links(code);
CREATE INDEX idx_device_links_user_id ON public.device_links(user_id);
CREATE INDEX idx_device_links_status ON public.device_links(status);
CREATE INDEX idx_device_links_expires_at ON public.device_links(expires_at);

-- Enable Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.devices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.device_links ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users table
CREATE POLICY "Users can view their own profile"
  ON public.users
  FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.users
  FOR UPDATE
  USING (auth.uid() = id);

-- RLS Policies for devices table
CREATE POLICY "Users can view their own devices"
  ON public.devices
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own devices"
  ON public.devices
  FOR DELETE
  USING (auth.uid() = user_id);

-- RLS Policies for device_links table
CREATE POLICY "Anyone can create device link requests"
  ON public.device_links
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can view device links they approved"
  ON public.device_links
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can approve device link requests"
  ON public.device_links
  FOR UPDATE
  USING (auth.uid() = user_id OR user_id IS NULL);

-- Function to create user profile after signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, display_name, plan, plan_status)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'display_name', NEW.email),
    'free',
    'active'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create user profile after signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update updated_at on users table
CREATE TRIGGER on_users_updated
  BEFORE UPDATE ON public.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Function to clean up expired device link requests (run daily)
CREATE OR REPLACE FUNCTION public.cleanup_expired_device_links()
RETURNS void AS $$
BEGIN
  DELETE FROM public.device_links
  WHERE expires_at < NOW() - INTERVAL '24 hours'
  AND status = 'expired';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON public.users TO authenticated;
GRANT ALL ON public.devices TO authenticated;
GRANT ALL ON public.device_links TO anon, authenticated;
