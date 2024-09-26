import 'dotenv/config';
import express from 'express';
import http from 'http';
import routes from './src/routes/index.js';
import cors, { CorsOptions } from 'cors';
import compression from 'compression';
import helmet from 'helmet';
const app: express.Application = express();

const server: http.Server = http.createServer(app);

const whitelist: string[] = [/* Listar aqui as urls para permitir acesso cors. Ex.: www.meusite.com.br */];

const corsOptions: CorsOptions = {
    origin: function (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) {
        if (whitelist.indexOf(origin as string) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('NÃO PERMITIDO PELO CORS'));
        }
    }
};

app.use(cors(corsOptions));
app.use(compression());
app.use(helmet());
app.use(express.json());
app.use(routes);

const PORT: number = Number(process.env.PORT) || 3333;

server.listen(PORT, () => {
    console.log(`O SERVIDOR ESTÁ RODANDO NA PORTA ${PORT}`);
});