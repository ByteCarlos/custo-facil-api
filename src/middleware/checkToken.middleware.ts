import { Injectable, NestMiddleware, HttpStatus } from '@nestjs/common';
import { Response, Request, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
require('dotenv/config');



@Injectable()
export class CheckToken implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // console.log(req.headers);
    jwt.verify(req.headers.authorization.split(' ')[1], process.env.PASSWORD_JWT, { complete: true, algorithms: ['HS256'] }, (err: jwt.VerifyErrors, decoded: jwt.Jwt) => {
      if (err) {
        console.log(err);
        res.status(HttpStatus.UNAUTHORIZED).send(err.message);
      } else {
        // realizar discusao futuramente para decisao sobre a insersao de logs no sistema
        // os logs podem ser inseridos diretamente no middleware e a cada sucesso ou erro ocorre
        // a manipulacao de logs dependendo do que se vai fazer no sistema
        // console.log(decoded);
        next();
      }
    });
  }
}
