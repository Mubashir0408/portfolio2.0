const MAX_ATTEMPTS = 5;
const WINDOW_MS = 10 * 60 * 1000;
const BLOCK_MS = 10 * 60 * 1000;

interface AttemptRecord {
  count: number;
  windowStart: number;
  blockedUntil: number | null;
}

// In-memory, per-server-instance store. Sufficient for a low-traffic admin
// login endpoint without introducing a new datastore; resets on redeploy.
const attempts = new Map<string, AttemptRecord>();

export interface RateLimitStatus {
  limited: boolean;
  retryAfterMs: number;
}

export function checkRateLimit(key: string): RateLimitStatus {
  const record = attempts.get(key);
  if (!record) {
    return { limited: false, retryAfterMs: 0 };
  }

  const now = Date.now();

  if (record.blockedUntil !== null) {
    if (now < record.blockedUntil) {
      return { limited: true, retryAfterMs: record.blockedUntil - now };
    }
    attempts.delete(key);
    return { limited: false, retryAfterMs: 0 };
  }

  if (now - record.windowStart > WINDOW_MS) {
    attempts.delete(key);
    return { limited: false, retryAfterMs: 0 };
  }

  return { limited: false, retryAfterMs: 0 };
}

export function recordFailedAttempt(key: string): RateLimitStatus {
  const now = Date.now();
  const record = attempts.get(key);

  if (!record || now - record.windowStart > WINDOW_MS) {
    attempts.set(key, { count: 1, windowStart: now, blockedUntil: null });
    return { limited: false, retryAfterMs: 0 };
  }

  record.count += 1;

  if (record.count >= MAX_ATTEMPTS) {
    record.blockedUntil = now + BLOCK_MS;
    return { limited: true, retryAfterMs: BLOCK_MS };
  }

  return { limited: false, retryAfterMs: 0 };
}

export function clearAttempts(key: string): void {
  attempts.delete(key);
}

export function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    const first = forwardedFor.split(",")[0]?.trim();
    if (first) {
      return first;
    }
  }

  const realIp = request.headers.get("x-real-ip");
  if (realIp) {
    return realIp;
  }

  return "unknown";
}
