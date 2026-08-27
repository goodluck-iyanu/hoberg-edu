'use client';
import React, { useState } from 'react';
import { Crown, Sparkles, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface PaystackButtonProps {
  userEmail?: string;
  onSuccess?: () => void;
  className?: string;
}

export function PaystackButton({ userEmail = 'student@hobergedu.com', onSuccess, className }: PaystackButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/paystack/initialize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userEmail, amount: 500000 }), // ₦5,000 in kobo
      });
      const data = await res.json();

      if (data.status && data.data?.authorization_url) {
        window.location.href = data.data.authorization_url;
      } else {
        alert('Could not initialize Paystack payment. Please check network.');
      }
    } catch (err) {
      console.error('Payment error:', err);
      alert('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="gold"
      size="lg"
      isLoading={isLoading}
      onClick={handlePayment}
      className={`gap-2 shadow-lg shadow-gold-500/20 hover:scale-[1.02] transition-transform ${className}`}
    >
      <Crown className="w-5 h-5 text-navy-950" />
      <span>Subscribe Now — ₦5,000 / month</span>
    </Button>
  );
}
