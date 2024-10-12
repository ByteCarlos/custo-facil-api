import { sequelize } from "src/sequelize/config.sequelize";
import { INTEGER, ENUM, STRING, TEXT } from "sequelize";

// decisao mais logica nesse caso é definir o modelo do banco na aqui model
export const Users = sequelize.define('users', {
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

export const Departments = sequelize.define('departments', {
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

export class User extends Department {
  id_usuario: number;
  name: String;
  email: String;
  password: String;
  tipo_usuario: ['manager', 'analyst', 'admin'];
  department_ID: number;
  department: Department;
}

// planejo treansformar em um padrao para retorno de data para o front
export class returnData {
  status: number;
  data?: Object;
  message?: String;
}