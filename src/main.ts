import { NestFactory } from '@nestjs/core';
import { AppModule } from './module/app.module';
import 'dotenv/config';

async function bootstrap() {
    const port: number | string = process.env.PORT_MAIN;
    const app = await NestFactory.create(AppModule);

    // Habilitar CORS
    app.enableCors({
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        allowedHeaders: ['Content-Type', 'Authorization']
    });

    await app.listen(port);
}
bootstrap();