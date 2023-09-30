import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigModule } from './config/app-config/app.config.module';
import { DatabaseModule } from './config/database-config/database.module';
import { EmployeeModule } from './employee/employee.module';

@Module({
  imports: [
    AppConfigModule,
    DatabaseModule,
    EmployeeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
