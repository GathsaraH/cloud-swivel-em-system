import { NestFactory } from "@nestjs/core";
import { Logger, ValidationPipe } from "@nestjs/common";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";
import { useContainer } from "class-validator";
import * as bodyParser from "body-parser";
import { config } from "dotenv";
import { setupSwagger } from "./config/swagger-config/swagger";
config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  const configService = app.get(ConfigService);
  app.enableShutdownHooks();
  app.setGlobalPrefix(configService.get("app.apiPrefix"), {
    exclude: ["/"],
  });
  app.useLogger(app.get(Logger));
  app.enableCors({
    origin: configService.get("app.frontendUrl"),
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe());
  //Setup Swagger
  setupSwagger(app);

  app.use(bodyParser.json({ limit: "5000mb" }));
  app.use(bodyParser.urlencoded({ limit: "5000mb", extended: true }));
  await app.listen(configService.get("app.port"), () => {
    console.log(
      `SwivelTech Employee Management System is running at  : ${configService.get(
        "app.port"
      )}`
    );
  });
}

bootstrap();
