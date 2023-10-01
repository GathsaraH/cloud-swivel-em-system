import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { swaggerConfig } from './swagger.config';

export const buildSwagger = (app) => {
  const config = new DocumentBuilder()
    .setTitle('SwivelTech Employee Management System')
    .setDescription(
      'The documentation about SwivelTech Employee Management System Api Documentation',
    )
    .setVersion('1.0')
    .build();
  return SwaggerModule.createDocument(app, config);
};

export const setupSwagger = (app) => {
  const document = buildSwagger(app);
  SwaggerModule.setup('docs', app, document, swaggerConfig);
};
