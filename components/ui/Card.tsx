import React from 'react';
import { cn } from '@/lib/utils';

export function Card({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'bg-white border border-navy-200/80 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
