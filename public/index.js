import 'dotenv/config';
import express from 'express';
import http from 'http';
import routes from './src/routes/index.js';
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';
const app = express();
const server = http.createServer(app);
const whitelist = [];
const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        }
        else {
            callback(new Error('NÃO PERMITIDO PELO CORS'));
        }
    }
};
app.use(cors(corsOptions));
app.use(compression());
app.use(helmet());
app.use(express.json());
app.use(routes);
const PORT = Number(process.env.PORT) || 3333;
server.listen(PORT, () => {
    console.log(`O SERVIDOR ESTÁ RODANDO NA PORTA ${PORT}`);
});
//# sourceMappingURL=index.js.map