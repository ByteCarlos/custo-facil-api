import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      checkPermissionUrl?: any; // dessa forma posso definir tipos globalmente para integrar ao lado dos modulos. Funciona como se fosse uma extenção
    }
  }
}