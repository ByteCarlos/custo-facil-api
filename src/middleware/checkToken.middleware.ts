import { Injectable, NestMiddleware, HttpStatus } from '@nestjs/common';
import { Response, Request, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { Token, Users, Departments, Roles, PermissoesUsers, Permissoes, User, Pages, PermissoesUser, Permisso } from '../model';
import { Error, Model } from "sequelize";
require('dotenv/config');

@Injectable()
export class CheckToken implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // console.log(req.headers.role);
    try {
      if (req.headers.authorization) {
        jwt.verify(req.headers.authorization.split(' ')[1], process.env.PASSWORD_JWT, { complete: true, algorithms: ['HS256'] }, async (err: jwt.VerifyErrors, decoded: jwt.Jwt) => {
          if (err) {
            res.status(HttpStatus.UNAUTHORIZED).send(err.message);
          } else {
            // realizar discusao futuramente para decisao sobre a insersao de logs no sistema
            // os logs podem ser inseridos diretamente no middleware e a cada sucesso ou erro ocorre
            // a manipulacao de logs dependendo do que se vai fazer no sistema
            const tokenUser = await new Token().checkToken(Object(decoded.payload));

            await Users.findOne({
              where: {
                email: tokenUser.email,
              },
              include: [Departments, {
                model: Roles,
                include: [{
                  model: PermissoesUsers,
                  include: [Permissoes],
                }],
              }],
            }).then(async (user: Model<User>) => {
              const checkPages = (await new Pages().PagesUser(user.get({plain: true}).role.permissoesusers));
              const tokenUserPages = await new Pages().PagesUser(tokenUser.permissionsusers);

              function checksolicitacao(role: String, userPages: Array<Permisso>, count: number = 0) {
                if (userPages[count].name === role) {
                  return true;
                } else if ((userPages[count].name !== role) && (count < (userPages.length - 1))) {
                  // recursivo
                  checksolicitacao(role, userPages, count + 1);
                } else {
                  return false;
                }
              }

              if ((JSON.stringify(checkPages) === JSON.stringify(tokenUserPages)) && (checksolicitacao(String(req.headers.role), checkPages) === true)) {
                next();
              } else {
                res.status(401).send("Você não possui acesso");
              }
            }).catch((err: Error) => {
              throw err;
            });
          }
        });
      } else {
        res.status(401).send("Não autorizado");
      }
    } catch (error) {
      // console.log(error);
      res.status(500).send("Provavelmente o serviço solicitado está indisponivel.");
    }
  }
}
