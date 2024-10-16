import { Injectable } from "@nestjs/common";
import { Error, Model } from "sequelize";
import { Users, User, returnData, Departments, Roles} from "../model";
import * as bcrypt from 'bcrypt';
import * as jwt from "jsonwebtoken";
require('dotenv/config');

@Injectable()
export class loginService {
  async loginUser(email: String, pass: String): Promise<Object> {
    const dataUser = new returnData();
    await Users.findOne({
      // attributes: ['id', 'name', 'role_fk', 'department_fk'],
      where: {
        email: email
      },
      include: [Departments, Roles],
    }).then((user: Model<User>) => {
      // console.log(user);

      // fiz essa funcao mas normalmente adiciono condicoes que retornam booleano diretamente no if
      function verifyPass(passVerify: string): boolean {
        const value: boolean = bcrypt.compareSync(String(pass), passVerify);
        // caso precisem criar senhas, apenas retirem esse comando do comentario e realizem uma req
        // console.log(bcrypt.hashSync(String(pass), 10));
        return value;
      }

      if (user == null) {
        throw "erro ao buscar usuario";
      } else if ((user.dataValues.email === email) && (verifyPass(String(user.dataValues.password))) === true) {
        dataUser.status = 200;
        
        dataUser.data = {
          nome: user.dataValues.name,
          department: user.dataValues.department.name,
          departmentID: user.dataValues.department.id,
          role: user.dataValues.role.name,
          token: jwt.sign({nome: user.dataValues.name, department: user.dataValues.department.id}, process.env.PASSWORD_JWT, { algorithm: 'HS256' }),
        }
        
      } else {
        throw "usuario ou senha incorreto";
      }
    }).catch((err: Error) => {
      console.log(err);
      if (err.name) {
        dataUser.status = 503;
        dataUser.message = err.name;
      } else {
        // por hora não irei definir os tipos para retornar o status e o codigo de erro corretos
        dataUser.status = 406;
        dataUser.message = String(err);
      }
    });

    return {...dataUser};
  }
}