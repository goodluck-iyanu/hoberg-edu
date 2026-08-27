import React from 'react';
import { Badge } from '@/components/ui/Badge';
import { ApplicationStatus } from '@/types';

interface Props {
  status: ApplicationStatus;
}

export function ApplicationStatusBadge({ status }: Props) {
  const configs: Record<ApplicationStatus, { label: string; variant: 'default' | 'info' | 'warning' | 'success' | 'danger' | 'purple' }> = {
    interested: { label: 'Interested', variant: 'default' },
    preparing: { label: 'Preparing', variant: 'warning' },
    documents_ready: { label: 'Documents Ready', variant: 'info' },
    applied: { label: 'Applied', variant: 'purple' },
    interview: { label: 'Interview Scheduled', variant: 'warning' },
    offer: { label: '🎉 Offer Received', variant: 'success' },
    rejected: { label: 'Not Successful', variant: 'danger' },
    withdrawn: { label: 'Withdrawn', variant: 'default' },
  };

  const config = configs[status] || { label: status, variant: 'default' };

  return <Badge variant={config.variant} size="md">{config.label}</Badge>;
}
