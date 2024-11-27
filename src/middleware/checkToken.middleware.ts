import { Injectable, NestMiddleware, HttpStatus } from '@nestjs/common';
import { Response, Request, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { Token, Users, Departments, Roles, PermissoesUsers, Permissoes, User, Pages, PermissoesUser, Permisso } from '../model';
import { Error, Model } from "sequelize";
require('dotenv/config');

@Injectable()
export class CheckToken implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // console.log(req.checkPermissionUrl);
    try {
      if ((req.headers.authorization !== undefined) && (req.headers.authorization !== 'undefined')) {
        jwt.verify(req.headers.authorization.split(' ')[1], process.env.PASSWORD_JWT, { complete: true, algorithms: ['HS256'] }, async (err: jwt.VerifyErrors, decoded: jwt.Jwt) => {
          if (err) {
            res.status(HttpStatus.UNAUTHORIZED).send(err.message);
          } else {
            const tokenUser = await new Token().checkToken(Object(decoded.payload));

            await Users.findOne({
              where: {
                email: tokenUser.email != undefined ? tokenUser.email : null,
              },
              include: [Departments, {
                model: Roles,
                include: [{
                  model: PermissoesUsers,
                  include: [Permissoes],
                }],
              }],
            }).then(async (user: Model<User>) => {
              if (user === null) throw user;
              const checkPages = await new Pages().PagesUser(user.get({plain: true}).role.permissoesusers);
              const tokenUserPages = await new Pages().PagesUser(tokenUser.permissionsusers);

              // function checksolicitacao(role: String, userPages: Array<Permisso>, count: number = 0): boolean {
              //   if (userPages[count].name === role) {
              //     console.log(`acesso permitido ${userPages[count].name === role}`);
              //     return true;
              //   } else if ((userPages[count].name !== role) && (count < (userPages.length - 1))) {
              //     // recursivo
              //     checksolicitacao(role, userPages, count + 1);
              //   } else {
              //     return false;
              //   }
              // }

              function checksolicitacao(role: String, userPages: Array<Permisso>, count: number = 0): boolean {
                var checkPermisso: boolean = false;
                
                userPages.forEach(async (page: Permisso) => {
                  if (page.name === role) {
                    checkPermisso = true;
                  }
                });

                return checkPermisso === false ? false : true;
              }

              // decisão de mudar do header para o tipo personalizado onde ele busca do baseURL é que isso me permite menos programação no front e mais facilidade no backend e banco
              // foi necessario mudar as permissões do banco para as baseURL
              // essas baseURL tambem são mostradas assim que roda o programa em desenvolvimento (aparece em verde no terminal)
              if ((JSON.stringify(checkPages) === JSON.stringify(tokenUserPages)) && (checksolicitacao(String(req.checkPermissionUrl), checkPages) === true)) {
                next();
              } else {
                res.status(401).send("Você não possui acesso");
              }
            }).catch((err: Error) => {
              res.status(500).send("Provavelmente o serviço solicitado está indisponivel.");
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
