import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigModule } from './config/app-config/app.config.module';
import { DatabaseModule } from './config/database-config/database.module';
import { EmployeeModule } from './employee/employee.module';
import { TerminusModule } from '@nestjs/terminus';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    AppConfigModule,
    DatabaseModule,
    EmployeeModule,
    TerminusModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
