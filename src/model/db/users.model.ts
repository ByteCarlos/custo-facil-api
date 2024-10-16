import { sequelize } from "../../sequelize/config.sequelize";
import { INTEGER, STRING} from "sequelize";
import { Roles, Departments } from "./";

export const Users = sequelize.define('users', {
  id: {
    type: INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: STRING(100),
    allowNull: false,
  },
  email: {
    type: STRING(100),
    allowNull: false,
  },
  password: {
    type: STRING(100),
    allowNull: false,
  },
  role_fk: {
    type: INTEGER,
    allowNull: true,
  },
  department_fk: {
    type: INTEGER,
    allowNull: true,
  },
}, {
  freezeTableName: true,
  timestamps: false,
});

// Users.belongsTo(Roles, { 
//   foreignKey: 'role_fk' 
// });

// Users.belongsTo(Departments, { 
//   foreignKey: 'department_fk' 
// });

// Roles.hasMany(Users, { 
//   foreignKey: 'role_fk' 
// });

// Departments.hasMany(Users, { 
//   foreignKey: 'department_fk' 
// });