export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function randomDelay(min: number, max: number): Promise<void> {
  const ms = Math.floor(Math.random() * (max - min + 1)) + min;
  return delay(ms);
}

// Standard delays simulating real network conditions
export const DELAYS = {
  pageLoad: () => randomDelay(800, 1200),
  action: () => randomDelay(400, 700),
  lazySection: () => randomDelay(300, 500),
  slowSection: () => randomDelay(1800, 2500),
  quickFetch: () => randomDelay(200, 400),
} as const;
