import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, Request, NextFunction } from "express";
import { Logs, Users, Action, Token } from '../model';
import * as jwt from "jsonwebtoken";
// require('dotenv/config');

@Injectable()
export class Log implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    try {
      var email: String | null = null;
      var user: String;

      if ((req.headers.authorization !== undefined) && (req.headers.authorization !== 'undefined')) {
        const tokenUser = jwt.verify(req.headers.authorization.split(' ')[1], process.env.PASSWORD_JWT, { complete: true, algorithms: ['HS256'] });
        const emailUser = await new Token().checkToken(Object(tokenUser.payload));
        email = emailUser.email;
      }

      await Users.findOne({
        where: {
          email: email,
        }
      }).then(val => {
        user = val == null ? null : val.dataValues.id;
      }).catch((err: Error) => {throw err});

      const action = await Action.findOne({
        where: {
          name: req.baseUrl,
        },
      });

      await Logs.create({
        user_fk: email == null ? null : user,
        log_timestamp: new Date,
        action_fk: action.dataValues.id,
      }).catch((err: Error) => { throw err });

      
    } catch (err) {
      console.log(err);
    }

    // como é um middleware de log, não faz sentido segurar a função, apenas segue entuquanto executa a inserção de fundo
    req.checkPermissionUrl = req.baseUrl;
    next();
  }
}
