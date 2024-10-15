import { sequelize } from "src/sequelize/config.sequelize";
import { INTEGER, STRING} from "sequelize";

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