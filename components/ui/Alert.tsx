import React from 'react';
import { AlertCircle, CheckCircle2, Info, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AlertProps {
  type?: 'info' | 'success' | 'warning' | 'danger';
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function Alert({ type = 'info', title, children, className }: AlertProps) {
  const configs = {
    info: { bg: 'bg-blue-50 text-blue-900 border-blue-200', icon: Info, iconColor: 'text-blue-600' },
    success: { bg: 'bg-brand-50 text-brand-900 border-brand-200', icon: CheckCircle2, iconColor: 'text-brand-600' },
    warning: { bg: 'bg-amber-50 text-amber-900 border-amber-200', icon: AlertTriangle, iconColor: 'text-amber-600' },
    danger: { bg: 'bg-red-50 text-red-900 border-red-200', icon: AlertCircle, iconColor: 'text-red-600' },
  };

  const current = configs[type];
  const Icon = current.icon;

  return (
    <div className={cn('p-4 border rounded-xl flex gap-3 text-sm', current.bg, className)}>
      <Icon className={cn('w-5 h-5 shrink-0 mt-0.5', current.iconColor)} />
      <div className="flex-1">
        {title && <div className="font-semibold mb-0.5">{title}</div>}
        <div className="text-navy-700">{children}</div>
      </div>
    </div>
  );
}
