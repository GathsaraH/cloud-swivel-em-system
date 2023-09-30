import { NestFactory } from "@nestjs/core";
import { Logger, ValidationPipe } from "@nestjs/common";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";
import { useContainer } from "class-validator";
import { config } from "dotenv";
import { setupSwagger } from "./config/swagger-config/swagger";
config();
global['fetch'] = require('node-fetch');
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  const configService = app.get(ConfigService);
  app.enableShutdownHooks();
  app.setGlobalPrefix(configService.get("app.apiPrefix"), {
    exclude: ["/"],
  });
  app.enableCors({
    origin: configService.get("app.corsOrigin"),
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe());
  //Setup Swagger
  setupSwagger(app);
  await app.listen(configService.get("app.port"), () => {
    console.log(
      `SwivelTech Employee Management System is running at  : ${configService.get(
        "app.port"
      )}`
    );
  });
}

bootstrap();
