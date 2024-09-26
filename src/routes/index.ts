import { Router } from 'express';

const routes: Router = Router();

// Rota de teste
routes.get('/', (_req: any, res: any) => {
    res.send('Olá eu sou a API do Custo Fácil!');
});

export default routes;