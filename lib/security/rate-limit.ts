const tracker = new Map<string, { count: number; expiresAt: number }>();

export function checkRateLimit(identifier: string, limit: number = 30, windowMs: number = 60000): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const record = tracker.get(identifier);

  if (!record || now > record.expiresAt) {
    tracker.set(identifier, { count: 1, expiresAt: now + windowMs });
    return { allowed: true, remaining: limit - 1 };
  }

  if (record.count >= limit) {
    return { allowed: false, remaining: 0 };
  }

  record.count += 1;
  return { allowed: true, remaining: limit - record.count };
}
