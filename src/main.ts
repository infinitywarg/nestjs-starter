import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';

async function bootstrap() {
  // log http requests
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn', 'debug', 'verbose'],
  });
  const logger = new Logger('Bootstrap');

  // global /api prefix for every endpoint
  app.setGlobalPrefix('/api');

  // enable API versioning at controller level
  app.enableVersioning({
    type: VersioningType.URI,
  });
  logger.log(`Global /api prefix and versioning enabled`);

  // Config service to inject .env variables globally
  const appConfig: ConfigService = app.get(ConfigService);
  const port: number = appConfig.getOrThrow<number>('PORT');

  // swagger openAPI 3.0 documentation builder
  const documentOptions = new DocumentBuilder()
    .setTitle('NestJS Starter Kit')
    .setDescription('Boilerplate template to start NestJS API project')
    .setVersion('1.0.0')
    .addTag('API Documentation')
    .build();
  const document = SwaggerModule.createDocument(app, documentOptions);
  SwaggerModule.setup('docs', app, document);
  logger.log(`Swagger docs initialized on /docs`);

  // cross origin security, customize options as per requirement
  app.enableCors({
    origin: '*',
    methods: 'GET, PUT, POST, DELETE',
    allowedHeaders: 'Content-Type, Authorization',
  });
  logger.log(`CORS protection enabled`);

  // http header security
  // defaults:
  // Content-Security-Policy: web pages cannot load remote fonts or styles. restrictive
  // Referrer-Policy: no-referrer by default. Requests performed by web pages served by your Node.js app will not include any referrer information.
  // Strict-Transport-Security:  specifies that a site or resource should only be accessed via HTTPS.
  // X-Content-Type-Options: defines that the MIME types used in the Content-Type header must be followed. This mitigates MIME type sniffing, which can lead to XSS attacks and cause other vulnerabilities.
  // X-Frame-Options: deny iframes
  app.use(helmet());
  logger.log(`HTTP headers protection enabled`);

  await app.listen(port);

  logger.log(`Server started on port ${port}`);
}

bootstrap();
