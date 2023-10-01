import { Injectable } from '@nestjs/common';
import { HealthCheckService, TypeOrmHealthIndicator } from '@nestjs/terminus';
import { Cron, CronExpression } from '@nestjs/schedule';
@Injectable()
export class AppService {
  constructor(
    private health: HealthCheckService,
    private db: TypeOrmHealthIndicator,
  ) {}

  /**
   * 
   * I used free postgres intense in singapore. I used this cron job to keep the database alive
   */
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  healthCheck() {    
    return this.health.check([() => this.db.pingCheck('database')]);
  }
}
