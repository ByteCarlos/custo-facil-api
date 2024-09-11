import { Injectable } from "@nestjs/common";
import { Error, Model } from "sequelize";
import { INTEGER, ENUM, STRING } from "sequelize";
import { sequelize } from "src/sequelize/config.sequelize";

// definição inicial da tabela de usuario, mas sera modificada e adicionada em um arquivo proprio
const User = sequelize.define('usuarios', {
  id: {
    type: INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: STRING,
    allowNull: false,
  },
  email: {
    type: STRING,
    allowNull: false,
  },
  password: {
    type: STRING,
    allowNull: false,
  },
  rule: {
    type: ENUM('Manager', 'Analyst', 'Admin'),
    allowNull: false,
  },
  departamentId: {
    type: INTEGER
  },
}, {
  timestamps: false,
});

const Departament = sequelize.define('departament', {
  id: {
    type: INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: STRING,
    allowNull: false,
  },
  description: {
    type: STRING,
    allowNull: false,
  },
}, {
  timestamps: false,
});

// o compartilhamento de chaves ainda não foi testado por conta que o BD não esta completo
// Departament.hasMany(User, {
//   foreignKey: 'departament_id',
//   onDelete: 'CASCADE',
//   onUpdate: 'CASCADE',
// });

// User.belongsTo(Departament, {
//   foreignKey: 'departament_id',
//   onDelete: 'CASCADE',
//   onUpdate: 'CASCADE',
// });

class Usuario {
  id_usuario: number;
  nome: String;
  email: String;
  senha: String;
  tipo_usuario: ['Manager', 'Analyst', 'Admin'];
  departamentId: number;
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
    await User.findOne({
      where: {
        email: email,
        senha: pass,
      }
    }).then((user: Model<Usuario>) => {
      if (user == null) {
        throw "erro ao buscar usuario";
      } else if (user.dataValues.email === email && user.dataValues.senha === pass) {
        dataUser.status = 200;
        // aqui eu irei modificar para retornar o token
        dataUser.data = {
          nome: user.dataValues.nome
        }
      }
    }).catch((err: Error) => {
      if (err.name) {
        dataUser.status = 503;
        dataUser.message = err.name;
      } else {
        // por hora não irei definir os tipos para retornar o status e o codigo de erro corretos
        dataUser.status = 406;
        dataUser.message = err.name;
      }
    });

    // apagar
    // fiz mock de dados para realizar um sucesso de requisição
    dataUser.status = 200;
    // aqui eu irei modificar para retornar o token
    dataUser.data = {
      nome: "Lucas",
      token: "token de acesso"
    }

    return {...dataUser};
  }
}