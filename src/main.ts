import { NestFactory } from '@nestjs/core';
import { AppModule } from './module/app.module';
require('dotenv/config');

const port: number | string = process.env.PORT_MAIN;

NestFactory.create(AppModule).then(app => {app.listen(port)});

// forma padrão de utilização com um exemplo inicial