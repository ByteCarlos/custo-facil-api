import { NestFactory } from '@nestjs/core';
import { AppModule } from './module/app.module';
import 'dotenv/config';

async function bootstrap() {
    const port: number | string = process.env.PORT_MAIN;
    const app = await NestFactory.create(AppModule);
    // Habilitar CORS
    const whitelist: string[] = ['http://localhost:3000', 'https://custos-seduc.netlify.app'];
    app.enableCors({
        origin: function (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) {
            if (whitelist.indexOf(origin as string) !== -1 || !origin) {
                callback(null, true);
            } else {
                callback(new Error('NÃO PERMITIDO PELO CORS'));
            }
        }
    });


    await app.listen(port);
}
bootstrap();