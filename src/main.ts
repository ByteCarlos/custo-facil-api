import { NestFactory } from '@nestjs/core';
import { AppModule } from './module/app.module';

NestFactory.create(AppModule).then(app => {app.listen(3000)});

// forma padrão de utilização com um exemplo inicial