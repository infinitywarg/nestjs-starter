import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';

async function bootstrap() {
  // log http requests
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn', 'debug', 'verbose'],
  });

  // global /api prefix for every endpoint
  app.setGlobalPrefix('/api');

  // enable API versioning at controller level
  app.enableVersioning({
    type: VersioningType.URI,
  });

  // swagger openAPI 3.0 documentation builder
  const config = new DocumentBuilder()
    .setTitle('NestJS Starter Kit')
    .setDescription('Boilerplate template to start NestJS API project')
    .setVersion('1.0.0')
    .addTag('API Documentation')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  // cross origin security, customize options as per requirement
  app.enableCors({
    origin: '*',
    methods: 'GET, PUT, POST, DELETE',
    allowedHeaders: 'Content-Type, Authorization',
  });

  // http header security
  // defaults:
  // Content-Security-Policy: web pages cannot load remote fonts or styles. restrictive
  // Referrer-Policy: no-referrer by default. Requests performed by web pages served by your Node.js app will not include any referrer information.
  // Strict-Transport-Security:  specifies that a site or resource should only be accessed via HTTPS.
  // X-Content-Type-Options: defines that the MIME types used in the Content-Type header must be followed. This mitigates MIME type sniffing, which can lead to XSS attacks and cause other vulnerabilities.
  // X-Frame-Options: deny iframes
  app.use(helmet());

  // start the app at port 3000
  await app.listen(3000);
}

bootstrap();
