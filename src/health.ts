import { HealthChecker, LivenessCheck } from '@cloudnative/health-connect';
import makeEventLoopChecker from 'event-loop-lag';

const createEventLoopLivenessChecker = () => {
  const lagChecker = makeEventLoopChecker(1000);
  return new LivenessCheck(
    'event loop lag check',
    (): Promise<void> =>
      new Promise((resolve, reject) => {
        const lag = lagChecker();
        if (lag > 40) {
          reject(`event loop lag threshold exceeded: ${lag} milliseconds `);
          return;
        }
        resolve();
      }),
  );
};

export const createHealthChecker = (): HealthChecker => {
  const healthChecker = new HealthChecker();
  healthChecker.registerLivenessCheck(createEventLoopLivenessChecker());
  return healthChecker;
};
