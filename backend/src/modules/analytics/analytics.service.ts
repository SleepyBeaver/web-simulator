import { Injectable } from '@nestjs/common';

@Injectable()
export class AnalyticsService {
  generateMetrics(data: any, scenarioConfig?: any) {
    const steps = data?.steps?.length || 1;

    const users = scenarioConfig?.users || 1;
    const delay = scenarioConfig?.delay || 1;

    const time = steps * delay * users;
    const cost = steps * users * 10;

    return {
      time,
      cost,
      efficiency: Math.round(100 / (delay || 1)),
      bottlenecks: steps > 5 ? ['Слишком много шагов'] : [],
    };
  }
}