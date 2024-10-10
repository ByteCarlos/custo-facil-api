import { Injectable } from "@nestjs/common";
import { Error, Model } from "sequelize";
import { INTEGER, ENUM, STRING, TEXT } from "sequelize";
import { sequelize } from "src/sequelize/config.sequelize";
import * as bcrypt from 'bcrypt';

// definição inicial da tabela de usuario, mas sera modificada e adicionada em um arquivo proprio
const Users = sequelize.define('users', {
  user_id: {
    type: INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: TEXT,
    allowNull: false,
  },
  email: {
    type: TEXT,
    allowNull: false,
  },
  password: {
    type: TEXT,
    allowNull: false,
  },
  role: {
    // type: ENUM('manager', 'analyst', 'admin'),
    type: TEXT,
    allowNull: true,
  },
  department_ID: {
    type: INTEGER,
    allowNull: true,
  },
}, {
  timestamps: false,
});

const Departments = sequelize.define('departments', {
  department_ID: {
    type: INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  department_name: {
    type: TEXT,
    allowNull: false,
  },
  description: {
    type: TEXT,
    allowNull: false,
  },
}, {
  timestamps: false,
});

Departments.hasMany(Users, {
  foreignKey: 'department_ID',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

Users.belongsTo(Departments, {
  foreignKey: 'department_ID',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

class Department {
  department_ID: number;
  department_name: String;
  description: String;
}

class User extends Department {
  id_usuario: number;
  name: String;
  email: String;
  password: String;
  tipo_usuario: ['manager', 'analyst', 'admin'];
  department_ID: number;
  department: Department;
}

export class returnData {
  status: number;
  data?: Object;
  message?: String;
}

@Injectable()
export class loginService {
  async loginUser(email: String, pass: String): Promise<Object> {
    const dataUser = new returnData;
    await Users.findOne({
      where: {
        email: email
      },
      include: Departments,
    }).then((user: Model<User>) => {

      function verifyPass(passVerify: string): boolean {
        // const hash: string = bcrypt.hashSync(String(pass), 10);
        const value: boolean = bcrypt.compareSync(String(pass), passVerify);
        console.log(value);
        // console.log(hash);
        return value;
      }

      if (user == null) {
        throw "erro ao buscar usuario";
      } else if ((user.dataValues.email === email) && (verifyPass(String(user.dataValues.password))) === true) {
        dataUser.status = 200;
        // aqui eu irei modificar para retornar o token
        dataUser.data = {
          nome: user.dataValues.name,
          department: user.dataValues.department.department_name,
          token: "token de acesso",
        }
        
      } else {
        throw "usuario ou senha incorreto";
      }
    }).catch((err: Error) => {
      // console.log(err);
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